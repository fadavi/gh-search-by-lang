import fastify from 'fastify'
import { router } from './router'

export const app = fastify({
  logger: process.env.NODE_ENV !== 'development'
})

app.register(router)
