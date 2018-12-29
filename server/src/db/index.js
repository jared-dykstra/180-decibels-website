import Knex from 'knex'

const knex = Knex({
  client: 'pg',
  asyncStackTraces: true,
  connection: 'postgres://o:newPassword@localhost:5432/decibels', // process.env.PG_CONNECTION_STRING,
  searchPath: ['knex', 'public'],
  migrations: {
    tableName: 'migrations'
  }
})
