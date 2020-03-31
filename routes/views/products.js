const router = require('express').Router()
const ProductsService = require('../../services/products')
const config = require('../../config')
const cacheResponse = require('../../utils/cacheResponse')
const { FIVE_MINUTES_IN_SECONDS } = require('../../utils/time')

module.exports = (app) => {
  app.use('/products', router)
  const productsService = new ProductsService()

  router.get('/', async (req, res, next) => {
    cacheResponse(res, FIVE_MINUTES_IN_SECONDS)
    try {
      const { tags } = req.query
      const productsList = await productsService.getProducts({ tags })
      res.render('products', { productsList, dev: config.dev })
    } catch (error) {
      next(error)
    }
  })
}

