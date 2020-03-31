const express = require('express')
const path = require('path')
const boom = require('@hapi/boom')
const cors = require('cors')
const debug = require('debug')('app:server')
const helmet = require('helmet')

const config = require('./config')
const { logErrors, clientErrorHandler, errorHandler, wrapErrors } = require('./utils/middlewares/errorHandlers')
const isRequestAjaxOrApi = require('./utils/isRequestAjaxOrApi')

const products = require('./routes/views/products')
const productsApi = require('./routes/api/products')
const authApi = require('./routes/api/auth')

const app = express()
// Middlewares
app.use(helmet())
app.use(express.json())
app.use(cors())

// Views engine
app.set('views', path.join(__dirname, 'views'))
app.set('view engine', 'pug')
app.use('/static', express.static(path.join(__dirname, 'assets')))

app.get('/', (req, res) => {
  res.redirect('/products')
})

// Routes
products(app)
productsApi(app)
authApi(app)

// Error handlers
app.use(function (req, res, next) {
  if (isRequestAjaxOrApi(req)) {
    const {
      output: { statusCode, payload }
    } = boom.notFound()

    return res.status(statusCode).json(payload)
  }

  res.status(404).render("404")
})

app.use(logErrors)
app.use(wrapErrors)
app.use(clientErrorHandler)
app.use(errorHandler)

// Run app
app.listen(config.port, () => {
  debug(`http://localhost:${config.port}`)
})