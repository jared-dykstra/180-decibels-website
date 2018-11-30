// see: https://github.com/passport/express-4.x-local-example/blob/master/server.js

import config from 'config'
import passport from 'passport'
import { Strategy as LocalStrategy } from 'passport-local'
import { Strategy as JWTStrategy, ExtractJwt } from 'passport-jwt'

import { findUser } from './dbAdapter'

// Configure the local strategy for use by Passport.
//
// The local strategy require a `verify` function which receives the credentials
// (`username` and `password`) submitted by the user.  The function must verify
// that the password is correct and then invoke `cb` with a user object, which
// will be set at `req.user` in route handlers after authentication.
passport.use(
  new LocalStrategy(
    {
      usernameField: 'email',
      passwordField: 'password',
      passReqToCallback: true
      // session: false
    },
    (req, email, password, cb) => {
      try {
        const user = findUser(email)
        if (!user) {
          return cb(null, false, { message: 'Incorrect email or password.' })
        }

        return cb(null, user, { message: 'Logged In Successfully' })
      } catch (err) {
        return cb(err)
      }
    }
  )
)

// Configure Passport authenticated session persistence.
//
// In order to restore authentication state across HTTP requests, Passport needs
// to serialize users into and deserialize users out of the session.  The
// typical implementation of this is as simple as supplying the user ID when
// serializing, and querying the user record by ID from the database when
// deserializing.
passport.serializeUser((user, cb) => {
  console.log('JARED - serializeUser')
  cb(null, user.email)
})

passport.deserializeUser((email, cb) => {
  console.log('JARED - deserializeUser')
  try {
    const user = findUser(email)
    return cb(null, user)
  } catch (err) {
    return cb(err)
  }
})

passport.use(
  new JWTStrategy(
    {
      // jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      jwtFromRequest: () => 'some fake JWT',
      secretOrKey: config.get('jwtSecret')
    },
    (jwtPayload, cb) => {
      console.log(`JARED: LOOKUP: jwtPayload=${JSON.stringify(jwtPayload)}`)
      try {
        // find the user in db if needed. This functionality may be omitted if you store everything you'll need in JWT payload.
        const email = jwtPayload.id
        const user = findUser(email)
        cb(null, user)
      } catch (err) {
        cb(err)
      }
    }
  )
)
