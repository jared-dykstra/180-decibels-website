const path = require('path')
const restify = require('restify')
const favicon = require('serve-favicon')
const compression = require('compression')
const serveStatic = require('serve-static')
const graphqlHTTP = require('express-graphql')

const apiSchema = require('./apiSchema')

const server = ({ clientRoot }) => {
  const app = restify.createServer()

  // Use gzip compression for static resources (files, etc)
  app.use(compression())
  // use gzip compression for GraphQL API calls
  app.use(restify.plugins.gzipResponse())

  app.use(favicon(path.join(clientRoot, 'favicon.ico')))

  const isProduction = process.env.NODE_ENV === 'production'
  const unhashedCacheDuration = isProduction ? 3600 : 0

  // serve-static middleware for all files in the clientRoot directory
  app.use(
    serveStatic(clientRoot, {
      index: false,
      immutable: true,
      maxAge: 31536000000, // <== serve-static accepts 'ms' and converts it to 's' for Cache-Control
      setHeaders: (res, p) => {
        // Limit caching for files which don't have a hash in their name
        if (p.endsWith('manifest.json') || p.endsWith('index.html')) {
          res.setHeader(
            'Cache-Control',
            `public, max-age=${unhashedCacheDuration}`
          )
        }
      }
    })
  )

  // GraphQL API
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
  // This includes the bare URL
  app.get(
    '*',
    // TODO: restify.plugins.serveStatic is not generating an ETag header
    restify.plugins.serveStatic({
      directory: clientRoot,
      file: 'index.html',
      maxAge: unhashedCacheDuration
    })
  )

  const port = process.env.PORT || 5000
  app.listen(port)

  // eslint-disable-next-line no-console
  console.log(`Server is listening on port ${port}`)
}

module.exports = server
