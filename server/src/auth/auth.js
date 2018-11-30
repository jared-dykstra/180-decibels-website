// See: https://medium.com/front-end-hacking/learn-using-jwt-with-passport-authentication-9761539c4314

import express from 'express'
import jwt from 'jsonwebtoken'
import config from 'config'

import { findUser } from './dbAdapter'

const router = express.Router()

const authDuration = 60 * 60 * 24

/* POST login. */
router.post('/login', (req, res, next) => {
  console.log('POST /login')
  const { email, password } = req.body
  const user = findUser(email)
  // TODO: Validate password by comparing signed & salted hashes

  console.log(`login: user=${JSON.stringify(user)}`)

  if (!user) {
    console.log('Login Attempt Failed.  User not found')
    res.status(401).json({
      message: 'Invalid email or password',
      user
    })
    return
  }

  // generate a signed json web token with the contents of user object and return it in the response
  const token = jwt.sign(user, config.get('jwtSecret'), {
    expiresIn: authDuration
  })
  // console.log(`Generating JWT token ${token}`)
  // // Note: .verify() can be async
  // console.log(
  //   `is JWT valid? ${JSON.stringify(
  //     jwt.verify(token, config.get('jwtSecret'))
  //   )}`
  // )
  // // .decode() does not require a public key--but the signature is not verified
  // console.log(`decoded: ${JSON.stringify(jwt.decode(token))}`)
  // res.cookie(config.get('jwtCookieName'), token, {
  //   maxAge: authDuration,
  //   httpOnly: true
  //   // httpOnly: false // <-- Allow the cookie to be accessed via javascript
  // })
  res.json({ user, token })
})

export default router
