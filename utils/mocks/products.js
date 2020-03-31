const productsMock = [
  {
    name: 'Nintendo Switch 2.0',
    price: 400,
    image: 'https://cnet4.cbsistatic.com/img/A30wInV8IiLm_DqvQ-eYivjdes4=/1092x0/2019/08/17/854d34f7-e452-4ee0-98b3-a1966f0eaf30/img-6605.jpg',
    tags: ['gaming']
  },
  {
    name: 'Nintendo Switch 2.0',
    price: 500,
    image: 'https://cnet4.cbsistatic.com/img/A30wInV8IiLm_DqvQ-eYivjdes4=/1092x0/2019/08/17/854d34f7-e452-4ee0-98b3-a1966f0eaf30/img-6605.jpg',
    tags: ['gaming']
  },
  {
    name: 'Nintendo Switch 2.0',
    price: 400,
    image: 'https://cnet4.cbsistatic.com/img/A30wInV8IiLm_DqvQ-eYivjdes4=/1092x0/2019/08/17/854d34f7-e452-4ee0-98b3-a1966f0eaf30/img-6605.jpg',
    tags: ['gaming']
  },
  {
    name: 'Nintendo Switch 2.0',
    price: 400,
    image: 'https://cnet4.cbsistatic.com/img/A30wInV8IiLm_DqvQ-eYivjdes4=/1092x0/2019/08/17/854d34f7-e452-4ee0-98b3-a1966f0eaf30/img-6605.jpg',
    tags: ['gaming']
  },
  {
    name: 'Nintendo Switch 2.0',
    price: 400,
    image: 'https://cnet4.cbsistatic.com/img/A30wInV8IiLm_DqvQ-eYivjdes4=/1092x0/2019/08/17/854d34f7-e452-4ee0-98b3-a1966f0eaf30/img-6605.jpg',
    tags: ['gaming']
  },
  {
    name: 'Nintendo Switch 2.0',
    price: 400,
    image: 'https://cnet4.cbsistatic.com/img/A30wInV8IiLm_DqvQ-eYivjdes4=/1092x0/2019/08/17/854d34f7-e452-4ee0-98b3-a1966f0eaf30/img-6605.jpg',
    tags: ['gaming']
  },
]

function filteredProductsMock(tag) {
  return productsMock.filter(product => product.tags.includes(tag))
}

class ProductsServiceMock {
  async getProducts() {
    return Promise.resolve(productsMock)
  }

  async createProduct() {
    return Promise.resolve("6bedb1267d1ca7f3053e2875")
  }
}

module.exports = {
  productsMock,
  filteredProductsMock,
  ProductsServiceMock
}