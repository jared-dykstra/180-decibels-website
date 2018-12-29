const config = require('config')

const knexConfig = config.get('knex')

module.exports = {
  [process.env.NODE_ENV || 'development']: knexConfig
}
