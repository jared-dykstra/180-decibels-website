// See: https://github.com/apollographql/fullstack-tutorial/blob/master/final/server/src/datasources/user.js
import { DataSource } from 'apollo-datasource'

const sleep = ms => new Promise(resolve => setTimeout(resolve, ms))

export default class UserAPI extends DataSource {
  constructor(/* { store } */) {
    super()
    // this.store = store
  }

  initialize(config) {
    this.context = config.context
  }

  async getUser(id) {
    console.log(`JARED - GET USER id=${id}`)
    throw new Error('User not found')
  }

  async registerUser(user) {
    console.log(`JARED - REGISTER USER.  user=${JSON.stringify(user)}`)
  }
}
