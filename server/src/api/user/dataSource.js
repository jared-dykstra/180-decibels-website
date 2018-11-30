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
    // If a user is found, the email is in use
    const user = findUser(email)
    return !!user
  }

  async getUser(parent, args, context, info) {
    const { user, token } = context
    // TODO: did express-jwt already validate the token when it parsed the user?  Need a test
    if (user) {
      return {
        user,
        token
      }
    }
    throw new Error('User not found')
  }

  async registerUser({ user }) {
    const result = await addUser(user)
    const { password, ...rest } = result
    return {
      user: rest,
      token: 'TODO: Get JWT Token'
    }
  }
}
