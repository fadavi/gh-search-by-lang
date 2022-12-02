import type { PageInfo } from './github/types'

export interface RequestLike {
  protocol?: string
  hostname?: string
  url?: string
}

export interface PaginationLinks {
  next?: string
  prev?: string
}

export function createUrlByRequest(
  request: RequestLike,
  params: Record<string, string | null> = {}
) {
  const protocol = request.protocol ?? 'http'
  const hostname = request.hostname ?? '.'
  const pathname = request.url ?? '/'
  const url = new URL(pathname, `${protocol}://${hostname}`)

  for (const [key, value] of Object.entries(params)) {
    if (value === null) {
      url.searchParams.delete(key)
    } else {
      url.searchParams.set(key, value)
    }
  }

  if (!request.hostname) {
    return url.pathname + url.search
  }

  return url.toString()
}

export function createPaginationLinks(
  request: RequestLike,
  pageInfo: PageInfo
) {
  const links: PaginationLinks = {}

  if (pageInfo.hasNextPage && pageInfo.endCursor) {
    links.next = createUrlByRequest(request, {
      before: null,
      after: pageInfo.endCursor
    })
  }

  if (pageInfo.hasPreviousPage && pageInfo.startCursor) {
    links.prev = createUrlByRequest(request, {
      before: pageInfo.startCursor,
      after: null
    })
  }

  return links
}
