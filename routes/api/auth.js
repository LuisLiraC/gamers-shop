const express = require('express')
const passport = require('passport')
const boom = require('@hapi/boom')
const jwt = require('jsonwebtoken')
const router = express.Router()
const config = require('../../config')

require('../../utils/auth/strategies/basic')

module.exports = (app) => {
  app.use('/api/auth', router)

  router.post('/token', async (req, res, next) => {
    passport.authenticate('basic', (error, user) => {
      try {
        if (error || !user) {
          return next(boom.unauthorized()) 
        }
  
        req.login(user, { session: false }, async (error) => {

          if (error) {
            return next(error)
          }

          const payload = { sub: user.username, email: user.email }
          const token = jwt.sign(payload, config.authJwtSecreT, { expiresIn: "15m" })
  
          return res.status(200).json({ token })
        })
      } catch (error) {
        return next(error)
      }
    })(req, res, next)
  })

}
