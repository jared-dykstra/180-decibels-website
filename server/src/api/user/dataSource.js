import config from 'config'
import { compare } from 'bcrypt'
import jwt from 'jsonwebtoken'
import { DataSource } from 'apollo-datasource'
import { UserInputError } from 'apollo-server-express'

import { addUser, findUser } from '../../auth/dbAdapter'

const getAndSetToken = ({
  user,
  authDuration = config.get('authDuration'),
  res
}) => {
  const token = jwt.sign(user, config.get('jwtSecret'), {
    expiresIn: authDuration
  })

  // If invoked via the web, set the auth token in a cookie
  if (res) {
    res.cookie(config.get('jwtCookieName'), token, {
      maxAge: authDuration,
      httpOnly: true
      // httpOnly: false // <-- Allow the cookie to be accessed via javascript
    })
  }

  return token
}

const verifyTokenAsync = async token =>
  new Promise((resolve, reject) => {
    jwt.verify(token, config.get('jwtSecret'), (err, decoded) => {
      if (err) {
        reject(err)
      } else {
        resolve(decoded)
      }
    })
  })

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
    // If a user is found, the email is in use
    const { user } = findUser(email)
    return !!user
  }

  /**
   * Validate the current authentication token.  If valid, return the user & token.  Otherwise throw
   */
  async authenticate({ token }) {
    const user = await verifyTokenAsync(token)
    if (!user) {
      throw new Error('User not found.  Sign in again?')
    }
    return {
      user,
      token
    }
  }

  /**
   * Verifies login credentials.  If valid, a new authentication token is generated.  A user and token is returned.
   * If the response `res` is available in the context, the new token is also set as a cookie
   */
  async signIn(args, context) {
    const { email, password } = args
    const { res } = context
    const { user, hashedPassword } = findUser(email)

    const errorMessage = 'Invalid email or password'

    // Does the user exist?
    if (!user) {
      console.warn('signIn: user not found')
      throw new UserInputError(errorMessage, {
        invalidArgs: ['password', 'email']
      })
    }

    // Validate hashed/salted password
    const isPasswordOK = await compare(password, hashedPassword)
    if (!isPasswordOK) {
      console.warn('signIn: bad password')
      throw new UserInputError(errorMessage, {
        invalidArgs: ['password', 'email']
      })
    }

    // Everything is OK
    const token = getAndSetToken({ user, res })
    return {
      user,
      token
    }
  }

  /**
   * Create a new user.  If valid, a new authentication token is generated.  A user and token is returned.
   * If the response `res` is available in the context, the new token is also set as a cookie
   */
  async registerUser(args, context) {
    const { user } = args
    const { res } = context
    const newUser = await addUser(user)
    const token = getAndSetToken({ user: newUser, res })
    return {
      user: newUser,
      token
    }
  }
}
