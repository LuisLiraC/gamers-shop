const express = require('express')
const path = require('path')
const products = require('./routes/views/products')
const productsApi = require('./routes/api/products')
const authApi = require('./routes/api/auth')
const config = require('./config')
const { logErrors, clientErrorHandler, errorHandler, wrapErrors } = require('./utils/middlewares/errorHandlers')
const isRequestAjaxOrApi = require('./utils/isRequestAjaxOrApi')
const boom = require('@hapi/boom')

const app = express()
app.use(express.json())

app.set('views', path.join(__dirname, 'views'))
app.set('view engine', 'pug')
app.use('/static', express.static(path.join(__dirname, 'assets')))

app.get('/', (req, res) => {
  res.redirect('/products')
})

products(app)
productsApi(app)
authApi(app)



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

app.listen(config.port, () => {
  console.log(`http://localhost:${config.port}`)
})