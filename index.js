const express = require('express')
const path = require('path')
const app = express()
const products = require('./routes/products')

app.set('views', path.join(__dirname, 'views'))
app.set('view engine', 'pug')

app.get('/', (req, res) => {
  res.send({ hello: 'hello', world: 'world' })
})

products(app)

const server = app.listen(3000, () => {
  console.log(`http://localhost:${server.address().port}`)
})