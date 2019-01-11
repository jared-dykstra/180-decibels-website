import path from 'path'
import throng from 'throng'

import { makeServer } from './server'

const WORKERS = process.env.WEB_CONCURRENCY || 1

throng({ workers: WORKERS, lifetime: Infinity }, id =>
  makeServer({ id, clientRoot: path.join(__dirname, '../../client/build') })
)
