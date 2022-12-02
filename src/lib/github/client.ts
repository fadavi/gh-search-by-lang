import { GraphQLClient } from 'graphql-request'

const GITHUB_GRAPHQL_ENDPOINT = 'https://api.github.com/graphql'

let client: GraphQLClient | null = null

export function createClient() {
  const token = process.env.GITHUB_TOKEN

  if (!token) {
    console.error('Missing GITHUB_TOKEN environment variable')
    return process.exit(1)
  }

  return new GraphQLClient(GITHUB_GRAPHQL_ENDPOINT, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  })
}

export function getClient() {
  return client = client ?? createClient()
}
