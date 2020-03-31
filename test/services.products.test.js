const assert = require('assert')
const proxyquire = require('proxyquire')

const { MongoLibMock, getAllStub, createStub } = require('../utils/mocks/mongoLib')
const { productsMock, filteredProductsMock } = require('../utils/mocks/products')

describe('services - products', () => {
  const ProductsService = proxyquire('../services/products', {
    '../lib/mongo': MongoLibMock
  })

  const productsService = new ProductsService()

  describe('when getProducts method is called ', async () => {
    it('should call the getAll method MongoLib method', async () => {
      await productsService.getProducts({})
      assert.strictEqual(getAllStub.called, true)
    })

    it('should retuin an array of products', async () => {
      const result = await productsService.getProducts({})
      const expected = productsMock
      assert.deepEqual(result, expected)
    })
  })

  describe('when products method is called with tags', async () => {
    it('should all the getAll MongoLib method with args', async () => {
      await productsService.getProducts({ tags: ['gaming'] })
      const tagQuery = { tags: { $in: ['gaming'] } }
      assert.strictEqual(getAllStub.calledWith('products', tagQuery), true)
    })

    it('should return an array of products filtered by the tag', async () => {
      const result = await productsService.getProducts({ tags: ['gaming'] })
      const expected = filteredProductsMock('gaming')
      assert.deepEqual(result, expected)
    })
  })
})