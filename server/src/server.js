import path from 'path'
import express from 'express'
import Session from 'express-session'
import bodyParser from 'body-parser'
import morgan from 'morgan'
import favicon from 'serve-favicon'
import compression from 'compression'
import passport from 'passport'
import config from 'config'

import './auth/passport'
import auth from './auth/auth'

import { createApi } from './api'

export const makeServer = ({ clientRoot }) => {
  const app = express()

  // morgan.token('graphql-query', req => {
  //   const { operationName } = req.body
  //   return `GRAPHQL: Operation Name: ${operationName}`
  // })
  // app.use(morgan(':graphql-query'))
  app.use(morgan('tiny'))

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
  createApi(app, '/graphql')

  // TODO: use gzip compression for GraphQL API calls

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
