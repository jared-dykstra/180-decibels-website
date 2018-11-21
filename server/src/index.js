const path = require('path')
const restify = require('restify')
const compression = require('compression')
const serveStatic = require('serve-static')
const graphqlHTTP = require('express-graphql')

const apiSchema = require('./apiSchema')

const server = ({ clientRoot }) => {
  const app = restify.createServer()

  app.use(compression())

  app.use(serveStatic(clientRoot, { immutable: true }))

  app.post(
    '/api',
    graphqlHTTP({
      schema: apiSchema,
      graphiql: false
    })
  )

  app.get(
    '/api',
    graphqlHTTP({
      schema: apiSchema,
      graphiql: true
    })
  )

  // Handles any requests that don't match the ones above, so react-router routes work
  app.get('*', async (req, res, next) => {
    try {
      res.sendFile(path.join(clientRoot, `index.html`))
    } catch (e) {
      next(e)
    }
  })

  const port = process.env.PORT || 5000
  app.listen(port)

  // eslint-disable-next-line no-console
  console.log(`Server is listening on port ${port}`)
}

module.exports = server
