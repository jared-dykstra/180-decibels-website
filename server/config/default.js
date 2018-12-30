const defer = require('config/defer').deferConfig

module.exports = {
  authDuration: 24 * 60 * 60,
  bcryptHashRounds: 9, // <-- See: https://www.npmjs.com/package/bcrypt#a-note-on-rounds
  idCookieName: 'id',
  idDuration: 10 * 365 * 24 * 60 * 60,
  profileCookieName: 'profile',
  jwtSecret: 'your-jwt-secret',
  agileCrm: {
    restApiUser: 'jared.dykstra@180decibels.com',
    restApiKey: 'vhh6ubgghfc58g74sbggcdp32v',
    restEndpoint: 'https://decibels.agilecrm.com/dev/'
  },
  knex: {
    // Default to Postgres with a connection string via $DATABASE_URL
    client: 'postgresql',
    connection: defer(() => `${process.env.DATABASE_URL}?ssl=true`),
    pool: {
      min: 2,
      max: 10
    },
    migrations: {
      tableName: 'knex_migrations',
      directory: './src/db/migrations'
    },
    seeds: {
      directory: './src/db/seeds'
    }
  }
}
