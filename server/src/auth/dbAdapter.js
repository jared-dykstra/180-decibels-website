// TODO: This get replaced with a proper DB

import { find as _find } from 'lodash'
import { UserInputError } from 'apollo-server'

const sleep = ms => new Promise(resolve => setTimeout(resolve, ms))

const users = [
  {
    email: 'jared.dykstra@gmail.com',
    firstName: 'Jared',
    lastName: 'Dykstra',
    tel: '403.837.4544',
    company: 'Shef Services, Inc'
  }
]

export const findUser = email => {
  const user = _find(users, u => u.email === email)
  return user || null
}

export const addUser = async user => {
  const { email } = user

  console.log(`JARED - TODO: REGISTER USER.  user=${JSON.stringify(user)}`)
  await sleep(100)

  // Temporary Test of validation logic -- replace with logic if email has already been registered
  if (email.endsWith('hotmail.com')) {
    throw new UserInputError('Hotmail is not accepted here', {
      invalidArgs: ['email']
    })
  }

  users.push(user)
  return user
}
