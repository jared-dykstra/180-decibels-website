// TODO: This gets replaced with a proper DB
import config from 'config'
import { find as _find } from 'lodash'
import { hash } from 'bcrypt'
import { UserInputError } from 'apollo-server-express'

const sleep = ms => new Promise(resolve => setTimeout(resolve, ms))

const users = [
  {
    id: '5ea90acf-9f79-405d-9648-69c2b2014557',
    aliases: [
      'ae45a5d6-f66f-468b-8124-434a71cb0c89',
      'e895dfb9-ead5-47d7-b490-4c9b4f5a3468'
    ],
    email: 'jared.dykstra@gmail.com',
    firstName: 'Jared',
    lastName: 'Dykstra',
    phone: '403.837.4544',
    company: 'Shef Services, Inc',
    hashedPassword:
      '$2b$04$LiKBXR05pIeNIrXooTxpoeetfV0.WWTIX3dRvDQnO.1P66QHtvzGS'
  }
]

export const findUser = email => {
  if (!email) {
    return null
  }
  const user = _find(users, u => u.email === email)
  const { hashedPassword, ...rest } = user || {}
  return {
    user: user ? rest : null,
    hashedPassword
  }
}

export const addUser = async userIn => {
  const { email } = userIn

  // eslint-disable-next-line no-console
  console.log(`JARED - TODO: REGISTER USER.  user=${JSON.stringify(userIn)}`)
  await sleep(100)

  // Temporary Test of validation logic -- replace with logic if email has already been registered
  if (email.endsWith('hotmail.com')) {
    throw new UserInputError('Hotmail is not accepted here', {
      invalidArgs: ['email']
    })
  }

  // Exclude the password and replaced with hashed/salted value
  const { password, ...userOut } = userIn

  // Generate hashed password
  const hashedPassword = await hash(password, config.get('bcryptHashRounds'))

  console.log(`hashedPassword=${hashedPassword}`)

  users.push({ ...userOut, hashedPassword })

  console.log(`users: ${JSON.stringify(users, null, 2)}`)

  return userOut
}
