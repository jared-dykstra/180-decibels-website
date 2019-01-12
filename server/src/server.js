import path from 'path'
import express from 'express'
import bodyParser from 'body-parser'
import cookieParser from 'cookie-parser'
import morgan from 'morgan'
import expressJwt from 'express-jwt'
import favicon from 'serve-favicon'
import compression from 'compression'
import config from 'config'

import { createApi } from './api'

const { NODE_ENV } = process.env
const isProduction = NODE_ENV === 'production'

export const makeServer = ({ id, clientRoot }) => {
  const app = express()

  // Logging middleware
  app.use(morgan('tiny'))

  // We're using a cookie-based authentication mechanism
  app.use(cookieParser())

  // Allow JSON in POST body - including for GraphQL
  app.use(bodyParser.json())

  // Sets req.user from the JWT
  app.use(
    expressJwt({
      secret: config.get('jwtSecret'),
      credentialsRequired: false,
      getToken: req => {
        const jwtCookie = req.cookies[config.get('profileCookieName')]
        return jwtCookie
      }
    })
  )

  // Use gzip compression for static resources (files, etc)
  app.use(compression())

  app.use(favicon(path.join(clientRoot, 'favicon.ico')))

  const unhashedCacheDuration = isProduction ? 3600 : 0

  // serve-static middleware for all files in the clientRoot directory
  app.use(
    express.static(clientRoot, {
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

  // API
  createApi(app, '/graphql')

  // Handles any requests that don't match the ones above, so react-router routes work
  // This includes the bare URL
  app.get('*', (req, res) => {
    // TODO: Add ETag generation
    res.sendFile(path.join(clientRoot, '404.html'))
  })

  const port = process.env.PORT || 5000
  app.listen(port)

  // eslint-disable-next-line no-console
  console.log(
    `Server worker ${id} is listening on port ${port}.  NODE_ENV=${NODE_ENV}`
  )
}
