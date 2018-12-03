//
// NOTE: The obvious choice is to use node-config or webpack-node-config, but I believe both options require ejecting
//

import { defaultsDeep as _defaultsDeep, get as _get, has as _has } from 'lodash'
import defaultConfig from './default'
import devConfig from './development'
import prodConfig from './production'

// Include all environments, so "built" code can be run with any value of NODE_ENV without rebuilding
// The consequence is that all config values for all environments will be contained in the production bundle
// ** DO NOT ** include passwords or other sensitive info.
const environments = {
  development: devConfig,
  production: prodConfig
}
const config = _defaultsDeep(environments[process.env.NODE_ENV], defaultConfig)

export const has = path => _has(config, path)

export const get = path => {
  if (!has(path)) {
    throw new Error(`Configuration not found for path=${JSON.stringify(path)}`)
  }
  return _get(config, path)
}

export default {
  get,
  has
}
