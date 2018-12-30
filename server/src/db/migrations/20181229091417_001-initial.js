module.exports.up = async (knex, Promise) => {
  await knex.schema.createTable('users', t => {
    t.dateTime('createdAt')
      .notNull()
      .primary()
    t.dateTime('deletedAt').nullable()
    t.uuid('uid').notNull()
    t.jsonb('aliases')
    t.text('email').notNull()
    t.jsonb('properties').nullable()
    t.text('hashedPassword').nullable()
    t.unique('uid', 'users_uid')
    t.unique('email', 'users_email')
  })

  await knex.schema.createTable('log', t => {
    t.dateTime('createdAt')
      .notNull()
      .primary()
    t.enum(
      'severity',
      [
        'Emergency',
        'Alert',
        'Critical',
        'Error',
        'Warning',
        'Notice',
        'Informational',
        'Debug'
      ],
      { useNative: true, enumName: 'syslog_type' }
    )
    t.uuid('uid').nullable()
    t.jsonb('data').notNull()
    t.index('uid', 'log_uid')
  })
}

module.exports.down = async (knex, Promise) => {
  await knex.schema.dropTable('users')
  await knex.schema.dropTable('log')
}
