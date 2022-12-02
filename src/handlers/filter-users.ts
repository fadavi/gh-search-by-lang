import type { FastifyReply, FastifyRequest } from 'fastify'
import type { SearchUsersOptions, SearchUsersResponse } from '../lib/github/search-users'
import { isClientError, isInvalidCursorArguments } from '../lib/github/errors'
import * as github from '../lib/github'
import { createPaginationLinks } from '../lib/pagination-links'
import { buildLanguagesQuery } from '../lib/sanitize'

export interface FilterUsersQuery {
  langs: string;
  limit: number;
  before?: string;
  after?: string;
}

export function prepareResponse(data: SearchUsersResponse) {
  const users = data.search.edges.map(({ node: u }) => ({
    username: u.username ?? null,
    name: u.name ?? null,
    avatarUrl: u.avatarUrl ?? null,
    followersCount: u.followers?.count ?? 0
  }))

  return {
    users,
    pageInfo: data.search.pageInfo,
    totalCount: data.search.totalCount
  }
}

export function prepareSearchOptions(query: FilterUsersQuery) {
  const langs = query.langs.split(',')
  const opts: SearchUsersOptions = {
    query: buildLanguagesQuery(langs)
  }

  if (query.before) {
    opts.last = query.limit
    opts.before = query.before
  } else if (query.after) {
    opts.first = query.limit
    opts.after = query.after
  } else {
    opts.first = query.limit
  }

  return opts
}

export function handleApiError(
  request: FastifyRequest,
  reply: FastifyReply,
  err: unknown
): void {
  let replyErr: Error = new Error()

  if (!isClientError(err)) {
    request.log.error(err, 'Unhandled error happened')
  } else if (isInvalidCursorArguments(err)) {
    replyErr = new Error('Invalid pagination cursor')
    reply.code(400)
  } else {
    reply.code(503)
    reply.header('retry-after', 120)
  }

  reply.send(replyErr)
}

export async function filterUsers(
  request: FastifyRequest<{ Querystring: FilterUsersQuery }>,
  reply: FastifyReply
): Promise<void> {
  if (request.query.before && request.query.after) {
    return reply.code(409).send(
      new TypeError('`bafore` and `after` are incompatible')
    )
  }

  const opts = prepareSearchOptions(request.query)
  let data: SearchUsersResponse

  try {
    data = await github.searchUsers(opts)
  } catch (err) {
    return handleApiError(request, reply, err)
  }

  const { users, pageInfo, totalCount } = prepareResponse(data)
  const links = createPaginationLinks(request, pageInfo)

  reply.send({ users, links, totalCount })
}
