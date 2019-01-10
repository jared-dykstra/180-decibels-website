module.exports = {
  rootUrl: 'http://localhost:3000',
  knex: {
    // A sqlite db doesn't require any manual setup
    client: 'sqlite3',
    connection: {
      filename: './dev.sqlite3'
    },
    useNullAsDefault: true
  }
}
