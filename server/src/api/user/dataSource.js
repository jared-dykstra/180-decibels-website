import { isNil } from 'lodash'
import config from 'config'
import uuid from 'uuid/v1'
import { compare } from 'bcrypt'
import jwt from 'jsonwebtoken'
import { DataSource } from 'apollo-datasource'
import { UserInputError } from 'apollo-server-express'

import { addUser, findUser, addAlias, appendLogEvent } from '../../db/dbAdapter'

import { AUTH } from '../../db/eventSources'

const cookieOptions = () => ({
  maxAge: config.get('authDuration'),
  httpOnly: true
})

const setUserId = (id, { res }) => {
  if (res) {
    res.cookie(config.get('idCookieName'), id, {
      maxAge: config.get('idDuration'),
      httpOnly: true
    })
  }
  return id
}

const getAndSetUserProfile = ({ user, res }) => {
  const token = jwt.sign(user, config.get('jwtSecret'), {
    expiresIn: config.get('authDuration')
  })

  // If invoked via the web, set the auth token in a cookie
  if (res) {
    res.cookie(config.get('profileCookieName'), token, cookieOptions())
  }

  return token
}

const invalidateUserProfile = ({ res }) => {
  if (res) {
    // Web browsers and other compliant clients will only clear the cookie if the given options is identical to those given to res.cookie(), excluding expires and maxAge.
    res.clearCookie(config.get('profileCookieName'), cookieOptions())
  }
}

/* eslint-disable class-methods-use-this */
export default class UserAPI extends DataSource {
  // constructor(/* { store } */) {
  //   super()
  //   // this.store = store
  // }

  initialize(configuration) {
    this.context = configuration.context
  }

  /**
   * Return true/false if a given email address is already in use
   */
  async isEmailInUse({ email }) {
    try {
      // If a user is found, the email is in use
      const user = await findUser(email)
      const isNotInUse = isNil(user)
      return !isNotInUse
    } catch (err) {
      await appendLogEvent({
        source: AUTH,
        event: `isEmailInUse Database Error: ${err}`
      })
      // Some sort of issue...Assume the email is available
      return false
    }
  }

  /**
   * Validate the current authentication token.  If valid, return the user & token.  Otherwise throw
   */
  async authenticate(context) {
    const { userId: rawUserId, userProfileToken } = context
    let userId = rawUserId
    if (!userId) {
      // First time visiting? Generate a new user ID
      userId = uuid()
      setUserId(userId, context)
      await appendLogEvent({
        userId,
        source: AUTH,
        event: 'authenticate - Generated new user ID'
      })
    }

    let user = null
    try {
      user = await jwt.verify(userProfileToken, config.get('jwtSecret'))
    } catch (err) {
      throw new Error('Authentication token not found or expired.')
    }

    if (!user) {
      throw new Error('User not found.  Sign in again?')
    }

    await appendLogEvent({
      userId,
      source: AUTH,
      event: 'Authenticated'
    })

    return {
      user,
      userProfileToken
    }
  }

  /**
   * Verifies login credentials.  If valid, a new authentication token is generated.  A user and token is returned.
   * If the response `res` is available in the context, the new token is also set as a cookie
   */
  async signIn(args, context) {
    const { email, password } = args
    const { res, userId } = context
    const errorMessage = 'Invalid email or password'

    const wrappedFindUser = async () => {
      try {
        const retval = await findUser(email)
        return retval
      } catch (err) {
        await appendLogEvent({
          userId,
          source: AUTH,
          event: `signIn Error - Unexpected Error fetching user: ${err}`
        })

        // Ensure a generic error is presented in the UI
        throw new UserInputError(errorMessage, {
          invalidArgs: ['password', 'email']
        })
      }
    }

    const { user, hashedPassword } = await wrappedFindUser()

    // Does the user exist?
    if (!user) {
      await appendLogEvent({
        userId,
        source: AUTH,
        event: 'signIn Error - incorrect email'
      })
      throw new UserInputError(errorMessage, {
        invalidArgs: ['password', 'email']
      })
    }

    // Validate hashed/salted password
    const isPasswordOK = await compare(password, hashedPassword)
    if (!isPasswordOK) {
      await appendLogEvent({
        userId,
        source: AUTH,
        event: 'signIn Error - incorrect password'
      })
      throw new UserInputError(errorMessage, {
        invalidArgs: ['password', 'email']
      })
    }

    // If the auto-generated user ID doesn't match the user retrieved via credentials,
    // then note the aliased user.  This happens when a user accesses the site using a 2nd browser or device
    // or if they have deleted cookies
    if (user.id !== userId) {
      await appendLogEvent({
        userId: user.id,
        source: AUTH,
        event: { message: 'signIn - add userId alias', alias: userId }
      })

      // Store currently set user ID as an alias for the logged in user
      await addAlias(user.id, userId)
      // Change the userID to the logged in user
      await setUserId(user.id, context)
    }

    await appendLogEvent({
      userId,
      source: AUTH,
      event: 'signIn Successful'
    })

    // Everything is OK
    const userProfileToken = getAndSetUserProfile({ user, res })
    return {
      user,
      userProfileToken
    }
  }

  /**
   * Invalidates user profile, but leave the user ID intact
   */
  async signOut(args, context) {
    const { userId } = context
    await appendLogEvent({
      userId,
      source: AUTH,
      event: 'signOut'
    })

    invalidateUserProfile(context)
  }

  /**
   * Create a new user.  If valid, a new authentication token is generated.  A user and token is returned.
   * If the response `res` is available in the context, the new token is also set as a cookie
   */
  async registerUser(args, context) {
    const { user } = args
    const { userId, res } = context

    // TODO: Re-run all the client-side form validation logic here

    await appendLogEvent({
      userId,
      source: AUTH,
      event: { message: 'registerUser', user }
    })

    const { user: newUser } = await addUser(userId, user)
    const newUserId = newUser.id
    if (newUserId !== userId) {
      // The user might have been assigned a different UserID.  If so, update their session accordingly
      await appendLogEvent({
        userId,
        source: AUTH,
        event: { message: 'registerUser - generated new user ID', newUserId }
      })
      setUserId(newUserId, context)
    }
    const userProfileToken = getAndSetUserProfile({ user: newUser, res })
    return {
      user: newUser,
      userProfileToken
    }
  }
}
