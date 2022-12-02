import { ClientError } from 'graphql-request'

export function isClientError(err: unknown): err is ClientError {
  return err instanceof ClientError
}

export function hasType(err: unknown): err is { type: unknown } {
  return {}.hasOwnProperty.call(err, 'type')
}

export function isInvalidCursorArguments(err: ClientError) {
  const subErrors = err.response.errors ?? []
  const matches = subErrors.some(
    e => hasType(e) && e.type === 'INVALID_CURSOR_ARGUMENTS'
  )

  return Boolean(matches)
}
