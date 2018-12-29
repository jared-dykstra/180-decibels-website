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

const eventLog = []

// Unpack the database representation of a user
const fromDbUser = user => {
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
}

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
  return !(user === undefined || user === null) ? fromDbUser(user) : undefined
}

export const addUser = async (userId, userIn) => {
  const { email: rawEmail } = userIn
  const normalizedEmail = normalizeEmail(rawEmail)

  // Ensure the email isn't already in use
  const existingUserByEmail = await findUser(normalizedEmail)
  if (existingUserByEmail) {
    throw new UserInputError(
      `The email address ${normalizedEmail} is already in use`,
      { invalidArgs: ['email'] }
    )
  }

  // If there is no userId or if the userId already exists, generate a new one to avoid conflicts
  // This could happen if a user is sharing a PC (eg. boardroom computer)
  let newUserId = userId
  const user = await knex('users')
    .where({ uid: userId })
    .first()
  if (!userId || user) {
    newUserId = uuid()
  }

  // Exclude the password and replaced with hashed/salted value
  // Exclude the email and replace with normalized email
  const { password, email, ...userProperties } = userIn

  // Generate hashed password
  const newDbUser = {
    createdAt: new Date(),
    uid: newUserId,
    hashedPassword: await hash(password, config.get('bcryptHashRounds')),
    email: normalizedEmail,
    aliases: JSON.stringify([]),
    properties: JSON.stringify(userProperties)
  }

  await knex('users').insert(newDbUser)

  return fromDbUser(newDbUser)
}

export const addAlias = async (userId, alias) => {
  if (!alias) {
    return
  }
  const user = await knex('users')
    .whereNull('deletedAt')
    .where({ uid: userId })
    .first()
  if (user) {
    const aliases = JSON.parse(user.aliases)
    const existingAlias = _find(aliases, a => a === alias)
    if (!existingAlias) {
      aliases.push(alias)
      // Update the aliases in the DB
      await knex('users')
        .whereNull('deletedAt')
        .where({ uid: userId })
        .update({
          aliases: JSON.stringify(aliases)
        })
    }
  } else {
    throw new Error('addAlias: userId not found')
  }
}
