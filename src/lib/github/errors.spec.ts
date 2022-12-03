import type { GraphQLError, GraphQLRequestContext, GraphQLResponse } from 'graphql-request/dist/types'
import { expect } from 'chai'
import { ClientError } from 'graphql-request'
import * as errors from './errors'

describe('lib/github/errors', () => {
  context('isClientError', () => {
    it('returns true when the arg is instance of ClientError', () => {
      const clientError = new ClientError(
        {} as GraphQLResponse,
        {} as GraphQLRequestContext,
      )

      expect(errors.isClientError(clientError)).to.be.true
    })

    it('returns false when the arg is not instance of ClientError', () => {
      class ClientError extends Error { }
      expect(errors.isClientError(new ClientError())).to.be.false
      expect(errors.isClientError(new Error())).to.be.false
    })
  })

  context('hasType', () => {
    it('returns true when the arg owns the "type" prop', () => {
      const obj = {
        hasOwnProperty: () => false,
        type: null,
      }

      expect(errors.hasType(obj)).to.be.true
    })

    it('returns false when the arg does not own the "type" prop', () => {
      const obj = {
        hasOwnProperty: () => false,
      }

      expect(errors.hasType(obj)).to.be.false
    })
  })

  context('isInvalidCursorArguments', () => {
    it('returns true when some error types match', () => {
      const clientError = new ClientError({
        status: 1234,
        // @ts-expect-error-next-line
        errors: [{ type: 'INVALID_CURSOR_ARGUMENTS' }],
      }, {} as GraphQLRequestContext)

      expect(errors.isInvalidCursorArguments(clientError)).to.be.true
    })

    it('returns false when none of error types matches', () => {
      const clientError = new ClientError({
        status: 1234,
        // @ts-expect-error-next-line
        errors: [{ type: 'ANOTHER_ERROR_TYPE' }] as GraphQLError[],
      }, {} as GraphQLRequestContext)

      expect(errors.isInvalidCursorArguments(clientError)).to.be.false
    })
  })
})
