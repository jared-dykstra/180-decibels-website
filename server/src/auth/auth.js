// See: https://medium.com/front-end-hacking/learn-using-jwt-with-passport-authentication-9761539c4314

import express from 'express'
import jwt from 'jsonwebtoken'
import passport from 'passport'
import config from 'config'

const router = express.Router()

/* POST login. */
router.post('/login', (req, res, next) => {
  passport.authenticate('local', (err1, user, info) => {
    if (err1 || !user) {
      console.log(`Login Attempt user=${JSON.stringify(user)}`)
      res.status(400).json({
        message: 'Something is not right',
        user
      })
      return
    }

    req.login(user, err2 => {
      if (err2) {
        res.send(err2)
        return
      }

      // generate a signed son web token with the contents of user object and return it in the response
      const token = jwt.sign(user, config.get('jwtSecret'))
      res.json({ user, token })
    })
  })(req, res)
})

export default router
