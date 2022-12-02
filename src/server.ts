import { app } from './app'

const PORT = Number(process.env.PORT) || 3000

if (require.main === module) {
  app.listen({ port: PORT }, (err, url) => {
    if (err) {
      console.error(err)
      return process.exit(1)
    }

    console.log(`Listening on port ${url}`)
  })
}
