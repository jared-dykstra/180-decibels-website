import { createApolloFetch } from 'apollo-fetch'

import { get as configGet } from 'config'

import { REGISTER_FORM_EMAIL_KEY } from './userManagementConstants'

const sleep = ms => new Promise(resolve => setTimeout(resolve, ms))

const uri = configGet('apiEndpoint')
const fetcher = createApolloFetch({ uri })

// If thrown errors are wrapped with `new Error()`,  the payload isn't available via redux-saga
// see: https://github.com/erikras/redux-form/issues/2442
/* eslint-disable no-throw-literal */

export const registerUser = async payload => {
  try {
    const { user } = payload
    console.log(`TODO: Register user=${JSON.stringify(user)}`)

    const retval = await fetcher({ query: { hello: '' } })
    console.log(`retval=${retval}`)

    await sleep(2 * 1000)
    throw {
      [REGISTER_FORM_EMAIL_KEY]:
        'That email address is already registered, please login'
    }
  } catch (err) {
    console.error(err)
    throw err
  }
}
