const router = require('express').Router()
const ProductService = require('../../services/products')
const { productIdSchema, productTagSchema, createProductSchema, updateProductSchema } = require('../../utils/schemas/products')
const passport = require('passport')
const validationHandler = require('../../utils/middlewares/validationHandler')
require('../../utils/auth/strategies/jwt')

const cacheResponse = require('../../utils/cacheResponse')
const { FIVE_MINUTES_IN_SECONDS, SIXTY_MINUTES_IN_SECONDS } = require('../../utils/time')

module.exports = (app) => {
  app.use('/api/products', router)
  const productService = new ProductService()

  router.get('/', async (req, res, next) => {
    cacheResponse(res, FIVE_MINUTES_IN_SECONDS)
    try {
      const { tags } = req.query
      const productsList = await productService.getProducts({ tags })

      res.status(200).json({
        data: productsList,
        message: 'products listed'
      })
    } catch (error) {
      next(error)
    }
  })

  router.get('/:id',
    validationHandler({ id: productIdSchema }, "params"),
    async (req, res, next) => {
      cacheResponse(res, SIXTY_MINUTES_IN_SECONDS)
      try {
        const { id } = req.params
        const productRetrieved = await productService.getProduct({ id })

        res.status(200).json({
          data: productRetrieved,
          message: 'product retrieved'
        })
      } catch (error) {
        next(error)
      }
    })

  router.post('/',
    passport.authenticate('jwt', { session: false }),
    validationHandler(createProductSchema),
    async (req, res, next) => {
      try {
        const { body: product } = req
        const productCreated = await productService.createProduct({ product })

        res.status(201).json({
          data: productCreated,
          message: 'product created'
        })
      } catch (error) {
        next(error)
      }
    })

  router.put('/:id',
    passport.authenticate('jwt', { session: false }),
    validationHandler({ id: productIdSchema }, "params"),
    validationHandler(updateProductSchema),
    async (req, res, next) => {
      try {
        const { id } = req.params
        const { body: product } = req
        const productUpdated = await productService.updateProduct({ id, product })

        res.status(200).json({
          data: productUpdated,
          message: 'product updated'
        })
      } catch (error) {
        next(error)
      }
    })

  router.delete('/:id',
    passport.authenticate('jwt', { session: false }),
    validationHandler({ id: productIdSchema }, "params"),
    async (req, res, next) => {
      try {
        const { id } = req.params
        const productDeleted = await productService.deleteProduct({ id })

        res.status(200).json({
          data: productDeleted,
          message: 'product deleted'
        })
      } catch (error) {
        next(error)
      }
    })
}
