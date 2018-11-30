// See: https://github.com/apollographql/fullstack-tutorial/blob/master/final/server/src/datasources/user.js
import { DataSource } from 'apollo-datasource'

import { addUser, findUser } from '../../auth/dbAdapter'

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

  async getUser(parent, args, context, info) {
    console.log(`JARED - TODO: GET user or user ID from context`)
    const id = 'jared.dykstra@gmail.com'
    const user = findUser(id)
    if (user) {
      return {
        user,
        token: 'TODO: Get JWT Token'
      }
    }
    throw new Error('User not found')
  }

  async registerUser({ user }) {
    const result = await addUser(user)
    const { password, ...rest } = result
    console.log(`registerUser rest=${JSON.stringify(rest)}`)
    return {
      user: rest,
      token: 'TODO: Get JWT Token'
    }
  }
}
