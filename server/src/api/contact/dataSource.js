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

  async requestCallback(args, context) {
    const { user, userId } = context
    const { contactInfo } = args
    console.log(
      `requestCallback context=${JSON.stringify({
        userId,
        user, // <== only available if signed in, which is unlikely
        contactInfo
      })}`
    )
    return null
  }
}
