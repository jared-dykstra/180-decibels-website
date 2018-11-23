import path from 'path'
import { makeServer } from './server'

makeServer({ clientRoot: path.join(__dirname, '../../client/build') })
