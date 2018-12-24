// See: https://github.com/apollographql/fullstack-tutorial/blob/master/final/server/src/datasources/user.js
import { DataSource } from 'apollo-datasource'

/* eslint-disable class-methods-use-this */

export default class ContactApi extends DataSource {
  constructor({ store } = {}) {
    super()
    this.store = store
  }

  initialize(config) {
    this.context = config.context
  }

  async requestCallback(args) {
    const { contactInfo } = args
    console.log(`requestCallback user=${JSON.stringify(contactInfo)}`)
    return null
  }
}
