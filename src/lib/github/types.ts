export type Edges<E> = E[]

export type Node<N> = { node: N }

export interface PageInfo {
  hasNextPage?: boolean
  hasPreviousPage?: boolean
  endCursor?: string
  startCursor?: string
}
