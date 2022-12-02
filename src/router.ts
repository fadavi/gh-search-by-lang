import { FastifyInstance } from 'fastify'
import { filterUsers } from './handlers/filter-users'

export async function router(fastify: FastifyInstance) {
  fastify.get(
    '/users',
    {
      schema: {
        querystring: {
          type: 'object',
          required: ['langs'],
          properties: {
            langs: {
              type: 'string',
              minLength: 1,
              maxLength: 128,
              pattern: '^\\s*,*[\\w#+/?!\\.\\\\-]+(?:\\s*,+\\s*[\\w#+/?!\\.\\\\-]+)*\\s*$',
            },
            limit: {
              type: 'integer',
              minimum: 1,
              maximum: 100,
              default: 20,
            },
            before: {
              type: 'string',
              minLength: 1,
              maxLength: 64,
            },
            after: {
              type: 'string',
              minLength: 1,
              maxLength: 64,
            },
          },
        },
      },
    },
    filterUsers,
  )
}
