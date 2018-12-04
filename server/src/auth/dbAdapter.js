// TODO: This gets replaced with a proper DB
import uuid from 'uuid/v1'
import config from 'config'
import { find as _find } from 'lodash'
import { hash } from 'bcrypt'
import { UserInputError } from 'apollo-server-express'

const sleep = ms => new Promise(resolve => setTimeout(resolve, ms))

const normalizeEmail = email => (email ? email.toLowerCase().trim() : email)

const users = [
  {
    id: '5ea90acf-9f79-405d-9648-69c2b2014557',
    aliases: [],
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
  console.log('dbAdapter::FindUser')
  if (!email) {
    return null
  }
  const normalizedEmail = normalizeEmail(email)
  const user = _find(users, u => u.email === normalizedEmail)
  const { hashedPassword, ...rest } = user || {}
  return {
    user: user ? rest : null,
    hashedPassword
  }
}

export const addUser = async (userId, userIn) => {
  const { email: rawEmail } = userIn
  const normalizedEmail = normalizeEmail(rawEmail)

  // eslint-disable-next-line no-console
  console.log(`JARED - TODO: REGISTER USER.  user=${JSON.stringify(userIn)}`)
  await sleep(100)

  // Temporary Test of validation logic -- replace with logic if email has already been registered
  if (normalizedEmail.endsWith('hotmail.com')) {
    throw new UserInputError('Hotmail is not accepted here', {
      invalidArgs: ['email']
    })
  }

  // Ensure the email isn't already in use
  const existingUserByEmail = findUser(normalizedEmail)
  if (existingUserByEmail.user) {
    throw new UserInputError(
      `The email address ${normalizedEmail} is already in use`,
      { invalidArgs: ['email'] }
    )
  }

  // If there is no userId or if the userId already exists, generate a new one to avoid conflicts
  // This could happen if a user is sharing a PC (eg. boardroom computer)
  let newUserId = userId
  const user = _find(users, u => u.id === userId)
  if (!userId || user) {
    console.warn(
      'addUser: userID unknown or already in use.  Generating a new userID'
    )
    newUserId = uuid()
  }

  // Exclude the password and replaced with hashed/salted value
  // Exclude the email and replace with normalized email
  const { password, email, ...newUser } = userIn

  // Generate hashed password
  newUser.hashedPassword = await hash(password, config.get('bcryptHashRounds'))
  newUser.id = newUserId
  newUser.email = normalizedEmail

  users.push({ aliases: [], ...newUser })

  // console.log(`dbAdapter::addUser users=${JSON.stringify(users, null, 2)}`)

  return { newUser, newUserId }
}

export const addAlias = async (userId, alias) => {
  if (!alias) {
    return
  }
  const user = _find(users, u => u.id === userId)
  if (user) {
    const existingAlias = _find(user.aliases, a => a === alias)
    if (!existingAlias) {
      user.aliases.push(alias)
    }
  } else {
    throw new Error('addAlias: userId not found')
  }

  // console.log(`dbAdapter::addAlias users=${JSON.stringify(users, null, 2)}`)
}
