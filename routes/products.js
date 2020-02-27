const express = require('express')
const router = express.Router()

const productsList = [
  {
    name: 'Nintendo Switch 2.0',
    price: 400,
    image: 'https://cnet4.cbsistatic.com/img/A30wInV8IiLm_DqvQ-eYivjdes4=/1092x0/2019/08/17/854d34f7-e452-4ee0-98b3-a1966f0eaf30/img-6605.jpg'
  },
  {
    name: 'Nintendo Switch 2.0',
    price: 400,
    image: 'https://cnet4.cbsistatic.com/img/A30wInV8IiLm_DqvQ-eYivjdes4=/1092x0/2019/08/17/854d34f7-e452-4ee0-98b3-a1966f0eaf30/img-6605.jpg'
  },
  {
    name: 'Nintendo Switch 2.0',
    price: 400,
    image: 'https://cnet4.cbsistatic.com/img/A30wInV8IiLm_DqvQ-eYivjdes4=/1092x0/2019/08/17/854d34f7-e452-4ee0-98b3-a1966f0eaf30/img-6605.jpg'
  },
  {
    name: 'Nintendo Switch 2.0',
    price: 400,
    image: 'https://cnet4.cbsistatic.com/img/A30wInV8IiLm_DqvQ-eYivjdes4=/1092x0/2019/08/17/854d34f7-e452-4ee0-98b3-a1966f0eaf30/img-6605.jpg'
  },
  {
    name: 'Nintendo Switch 2.0',
    price: 400,
    image: 'https://cnet4.cbsistatic.com/img/A30wInV8IiLm_DqvQ-eYivjdes4=/1092x0/2019/08/17/854d34f7-e452-4ee0-98b3-a1966f0eaf30/img-6605.jpg'
  },
  {
    name: 'Nintendo Switch 2.0',
    price: 400,
    image: 'https://cnet4.cbsistatic.com/img/A30wInV8IiLm_DqvQ-eYivjdes4=/1092x0/2019/08/17/854d34f7-e452-4ee0-98b3-a1966f0eaf30/img-6605.jpg'
  },

]

module.exports =  function products(app) {
  app.use('/products', router)

  router.get('/', (req, res) => {
    res.render('products', { productsList })
  })
}

