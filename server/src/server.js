import path from 'path'
import fs from 'fs'
import express from 'express'
import bodyParser from 'body-parser'
import cookieParser from 'cookie-parser'
import morgan from 'morgan'
import expressJwt from 'express-jwt'
import favicon from 'serve-favicon'
import compression from 'compression'
import config from 'config'

import { createApi } from './api'
import { getOgDefaults, getOgValuesForRoute } from './openGraph'

const { NODE_ENV } = process.env
const isProduction = NODE_ENV === 'production'

/**
 *  Replace a set of tokens in a file with corresponding values.
 */
const replaceTagsInFile = (fileAsString, mapObj) => {
  const re = new RegExp(Object.keys(mapObj).join('|'), 'gi')
  // .replace() returns a new string (does not mutate the original)
  return fileAsString.replace(re, matched => mapObj[matched])
}

export const makeServer = ({ id, clientRoot }) => {
  const indexHtml = fs.readFileSync(path.join(clientRoot, 'index.html'), 'utf8')

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

  // API
  createApi(app, '/graphql')

  // Handles any requests that don't match the ones above, so react-router routes work
  // This includes the bare URL
  app.get('*', (req, res) => {
    // TODO: Add ETag generation

    // Generate OpenGraph values for the request
    const values = getOgValuesForRoute(req)
    const defaults = getOgDefaults(req)
    const mapObj = { ...defaults, ...values }

    // Update OpenGraph values when sending the response
    res.send(replaceTagsInFile(indexHtml, mapObj))
  })

  const port = process.env.PORT || 5000
  app.listen(port)

  // eslint-disable-next-line no-console
  console.log(
    `Server ${
      id > 0 ? `throng worker ${id} ` : ''
    }is listening on port ${port}.  NODE_ENV=${NODE_ENV}`
  )
}
