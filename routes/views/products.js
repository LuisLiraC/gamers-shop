const router = require('express').Router()
const ProductsService = require('../../services/products')

module.exports = (app) => {
  app.use('/products', router)
  const productsService = new ProductsService()

  router.get('/', async (req, res, next) => {
    try {
      const { tags } = req.query
      const productsList = await productsService.getProducts({ tags })
      res.render('products', { productsList })
    } catch (error) {
      next(error)
    }
  })
}

