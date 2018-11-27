import path from 'path'
import express from 'express'
import favicon from 'serve-favicon'
import compression from 'compression'
import { ApolloServer } from 'apollo-server-express'

import { schema, dataSources } from './api'

export const makeServer = ({ clientRoot }) => {
  const server = express()

  // Use gzip compression for static resources (files, etc)
  server.use(compression())

  server.use(favicon(path.join(clientRoot, 'favicon.ico')))

  server.get('/robots.txt', (req, res) => {
    res.type('text/plain')
    // TODO: Currently disallowing everything.  Change to "Disallow: " before going live
    res.send('User-agent: *\nDisallow: /')
  })

  const isProduction = process.env.NODE_ENV === 'production'
  const unhashedCacheDuration = isProduction ? 3600 : 0

  // serve-static middleware for all files in the clientRoot directory
  server.use(
    express.static(clientRoot, {
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

  // // // API Begin

  // // the function that sets up the global context for each resolver, using the req
  // const context = async ({ req }) =>
  //   // // simple auth check on every request
  //   // const auth = (req.headers && req.headers.authorization) || ''
  //   // const email = new Buffer(auth, 'base64').toString('ascii')

  //   // // if the email isn't formatted validly, return null for user
  //   // if (!isEmail.validate(email)) return { user: null }
  //   // // find a user by their email
  //   // const users = await store.users.findOrCreate({ where: { email } })
  //   // const user = users && users[0] ? users[0] : null

  //   // return { user: { ...user.dataValues } }
  //   ({ user: {} })

  // TODO: use gzip compression for GraphQL API calls

  const apolloServer = new ApolloServer({ schema, dataSources })
  apolloServer.applyMiddleware({ app: server })

  // // // API END

  // Handles any requests that don't match the ones above, so react-router routes work
  // This includes the bare URL
  server.get('*', (req, res) => {
    // TODO: Add ETag generation
    res.sendFile(path.join(clientRoot, 'index.html'))
  })

  const port = process.env.PORT || 5000
  server.listen(port)

  // eslint-disable-next-line no-console
  console.log(`Server is listening on port ${port}`)
}
