import { gql } from 'graphql-request'
import { getClient } from './client'
import type { Edges, PageInfo, Node } from './types'

export interface SearchUsersOptions {
  query: string
  first?: number
  last?: number
  before?: string
  after?: string
}

export interface UserInfo {
  username?: string
  name?: string
  avatarUrl?: string
  followers?: {
    count?: number
  }
}

export interface SearchUsersResponse {
  search: {
    edges: Edges<Node<UserInfo>>
    pageInfo: PageInfo
    totalCount: number
  }
}

const SEARCH_USERS = gql`
  query SearchUsers($query: String!,
                    $first: Int = null,
                    $last: Int = null,
                    $before: String = null,
                    $after: String = null) {
    search(query: $query,
           type: USER,
           first: $first,
           last: $last,
           before: $before,
           after: $after) {
      edges {
        node {
          ... on User {
            username: login
            name
            avatarUrl
            followers {
              count: totalCount
            }
          }
        }
      }
      pageInfo {
        hasNextPage
        hasPreviousPage
        endCursor
        startCursor
      }
      totalCount: userCount
    }
  }
`

export async function searchUsers(opts: SearchUsersOptions) {
  return getClient().request(SEARCH_USERS, opts)
}
