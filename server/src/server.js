import path from 'path'
import express from 'express'
import Session from 'express-session'
import bodyParser from 'body-parser'
import favicon from 'serve-favicon'
import compression from 'compression'
import { ApolloServer } from 'apollo-server-express'
import passport from 'passport'
import config from 'config'

import './auth/passport'
import auth from './auth/auth'

import user from './user'

import { schema, dataSources } from './api'

export const makeServer = ({ clientRoot }) => {
  const app = express()

  // Setup Session Middleware
  app.use(
    Session({
      secret: config.get('sessionSecret'),
      resave: true,
      saveUninitialized: true
    })
  )

  // Parse application/x-www-form-urlencoded
  // app.use(bodyParser.urlencoded({ extended: false }))

  // Allow JSON in POST body
  // TODO: See if this can be removed--or moved to only the routes that need it
  app.use(bodyParser.json())

  // Use gzip compression for static resources (files, etc)
  app.use(compression())

  app.use(passport.initialize())
  app.use(passport.session())

  app.use(favicon(path.join(clientRoot, 'favicon.ico')))

  app.get('/robots.txt', (req, res) => {
    res.type('text/plain')
    // TODO: Currently disallowing everything.  Change to "Disallow: " before going live
    res.send('User-agent: *\nDisallow: /')
  })

  const isProduction = process.env.NODE_ENV === 'production'
  const unhashedCacheDuration = isProduction ? 3600 : 0

  // serve-static middleware for all files in the clientRoot directory
  app.use(
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

  app.use('/auth', auth)
  // app.use('/user', passport.authenticate('jwt', { session: false }), user)

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
  apolloServer.applyMiddleware({ app })

  // // // API END

  // Handles any requests that don't match the ones above, so react-router routes work
  // This includes the bare URL
  app.get('*', (req, res) => {
    // TODO: Add ETag generation
    res.sendFile(path.join(clientRoot, 'index.html'))
  })

  const port = process.env.PORT || 5000
  app.listen(port)

  // eslint-disable-next-line no-console
  console.log(`Server is listening on port ${port}`)
}
