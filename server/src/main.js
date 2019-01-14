import path from 'path'
import throng from 'throng'

import { makeServer } from './server'

if (process.env.NODE_ENV === 'development') {
  makeServer({
    id: '-1',
    clientRoot: path.join(__dirname, '../../client/build')
  })
} else {
  const WORKERS = process.env.WEB_CONCURRENCY || 1
  throng({ workers: WORKERS, lifetime: Infinity }, id =>
    makeServer({ id, clientRoot: path.join(__dirname, '../../client/build') })
  )
}
