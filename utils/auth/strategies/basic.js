const passport = require('passport')
const { BasicStrategy } = require('passport-http')
const boom = require('@hapi/boom')
const bcrypt = require('bcryptjs')
const MongoLib = require('../../../lib/mongo')

passport.use(
  new BasicStrategy(async function(username, password, cb) {
    const mongoDb = new MongoLib()

    try {
      const [user] = await mongoDb.getAll("users", { username })

      if(!user) {
        return cb(boom.unauthorized(), false)
      }

      if(!(await bcrypt.compare(password, user.password))) {
        return cb(boom.unauthorized(), false) 
      }

      return cb(null, user)

    } catch(error) {
      return cb(error)
    }
  })
)