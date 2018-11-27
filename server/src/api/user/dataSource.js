// See: https://github.com/apollographql/fullstack-tutorial/blob/master/final/server/src/datasources/user.js
import { UserInputError } from 'apollo-server'
import { DataSource } from 'apollo-datasource'

const sleep = ms => new Promise(resolve => setTimeout(resolve, ms))

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
    if (email.endsWith('hotmail.com')) {
      return true
    }

    return false
  }

  async getUser(user) {
    const { id } = user
    console.log(`JARED - TODO: GET USER id=${id}`)
    throw new Error('User not found')
  }

  async registerUser(user) {
    await sleep(100)
    const { firstName, lastName, company, email, phone } = user
    console.log(`JARED - TODO: REGISTER USER.  user=${JSON.stringify(user)}`)

    // Temporary Test of validation logic -- replace with logic if email has already been registered
    if (email.endsWith('hotmail.com')) {
      throw new UserInputError('Hotmail is not accepted here', {
        invalidArgs: ['email']
      })
    }

    return 'hello'
  }
}
