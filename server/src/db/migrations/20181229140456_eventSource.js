const colEventSource = 'eventSource'
const tLog = 'log'

exports.up = async (knex, Promise) => {
  await knex.schema.table(tLog, t => {
    t.string(colEventSource)
  })
}

exports.down = async (knex, Promise) => {
  await knex.schema.table(tLog, t => {
    t.dropColumn(colEventSource)
  })
}
