// TODO: This gets replaced with a proper DB
import uuid from 'uuid/v1'
import config from 'config'
import { find as _find, isObject as _isObject } from 'lodash'
import { hash } from 'bcrypt'
import { UserInputError } from 'apollo-server-express'
import Knex from 'knex'

const knexConfig = config.get('knex')
const knex = Knex(knexConfig)

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

const eventLog = []

export const eventSources = {
  AUTH: 'AUTH'
}

export const appendLogEvent = async ({ userId, source, event }) => {
  const now = new Date()
  const eventObj = _isObject(event) ? event : { message: JSON.stringify(event) }
  const log = {
    userId,
    timestamp: now.getTime(),
    source,
    event: eventObj
  }
  eventLog.push(log)
  console.log(`Event: ${JSON.stringify(log)}`)
}

export const findUser = async email => {
  if (!email) {
    return null
  }
  const normalizedEmail = normalizeEmail(email)
  const user = await knex('users')
    .whereNull('deletedAt')
    .where({ email: normalizedEmail })
    .first()

  // If no match; user is undefined
  if (!user) {
    throw new Error(`User not found for ${normalizedEmail}`)
  }

  const properties = JSON.parse(user.properties)

  return {
    user: {
      id: user.uid,
      aliases: user.aliases,
      email: user.email,
      ...properties
    },
    hashedPassword: user.hashedPassword
  }

  // {
  //   id: '5ea90acf-9f79-405d-9648-69c2b2014557',
  //   aliases: [],
  //   email: 'jared.dykstra@gmail.com',
  //   firstName: 'Jared',
  //   lastName: 'Dykstra',
  //   phone: '403.837.4544',
  //   company: 'Shef Services, Inc',
  //   hashedPassword:
  //     '$2b$04$LiKBXR05pIeNIrXooTxpoeetfV0.WWTIX3dRvDQnO.1P66QHtvzGS'
  // }

  // const user = _find(users, u => u.email === normalizedEmail)
  // const { hashedPassword, ...rest } = user || {}
  // return {
  //   user: user ? rest : null,
  //   hashedPassword
  // }
}

export const addUser = async (userId, userIn) => {
  const { email: rawEmail } = userIn
  const normalizedEmail = normalizeEmail(rawEmail)

  // eslint-disable-next-line no-console
  console.log(`JARED - TODO: REGISTER USER.  user=${JSON.stringify(userIn)}`)
  await sleep(100)

  // Ensure the email isn't already in use
  const existingUserByEmail = await findUser(normalizedEmail)
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
