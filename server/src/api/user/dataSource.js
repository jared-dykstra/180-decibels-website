// See: https://github.com/apollographql/fullstack-tutorial/blob/master/final/server/src/datasources/user.js
import { DataSource } from 'apollo-datasource'

import { addUser } from '../../auth/dbAdapter'

/* eslint-disable class-methods-use-this */
export default class UserAPI extends DataSource {
  // constructor(/* { store } */) {
  //   super()
  //   // this.store = store
  // }

  initialize(config) {
    this.context = config.context
  }

  async isEmailInUse({ email }) {
    // TODO: Not implemented
    if (email.endsWith('bar.com')) {
      return true
    }

    return false
  }

  async getUser(user) {
    const { id } = user
    console.log(`JARED - TODO: GET USER id=${id}`)
    throw new Error('User not found')
  }

  async registerUser({ user }) {
    const result = await addUser(user)
    const { password, ...rest } = result
    return rest
  }
}
