import fastify from 'fastify'
import { router } from './router'

export const app = fastify({
  logger: process.env.NODE_ENV === 'production'
})

app.register(router)
