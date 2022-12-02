import { app } from './app'

const PORT = Number(process.env.PORT) || 3000
const HOST = process.env.HOST || 'localhost'

if (require.main === module) {
  app.listen({ port: PORT, host: HOST }, (err, url) => {
    if (err) {
      console.error(err)
      return process.exit(1)
    }

    console.log(`Listening on port ${url}`)
  })
}
