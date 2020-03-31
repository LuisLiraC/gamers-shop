const productsMock = require('../utils/mocks/products')
const MongoLib = require('../lib/mongo')

class ProductsService {
  constructor() {
    this.collection = 'products'
    this.mongoDb = new MongoLib()
  }

  async getProducts({ tags }) {
    const query = tags && { tags: { $in: tags } }
    const products = await this.mongoDb.getAll(this.collection, query)
    return products || []
  }

  async getProduct({ id }) {
    const product = await this.mongoDb.get(this.collection, id)
    return product || {}
  }

  async createProduct({ product }) {
    return await this.mongoDb.create(this.collection, product)
  }

  async updateProduct({ id, product }) {
    return await this.mongoDb.update(this.collection, id, product)
  }

  async deleteProduct({ id }) {
    return await this.mongoDb.delete(this.collection, id)
  }
}

module.exports = ProductsService