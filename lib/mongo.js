const { MongoClient, ObjectID } = require('mongodb')
const config = require('../config')

const USER = encodeURIComponent(config.dbUser)
const PASSWORD = encodeURIComponent(config.dbPassword)
const DB_NAME = config.dbName
const MONGO_URI = `mongodb+srv://${USER}:${PASSWORD}@${config.dbHost}/${DB_NAME}?retryWrites=true&w=majority`

class MongoLib {
  constructor() {
    this.client = new MongoClient(MONGO_URI, { 
      useNewUrlParser: true, 
      useUnifiedTopology: true 
    })
    this.dbName = DB_NAME
  }

  async connect() {
    if (!MongoLib.connection) {
      try {
        await this.client.connect()
        console.log('Connected successfully to mongo')
        MongoLib.connection = this.client.db(this.dbName)
      } catch (error) {
        console.log(error)
      }
    }
    return MongoLib.connection
  }

  async getAll(collection, query) {
    try {
      const db = await this.connect()
      return await db
        .collection(collection)
        .find(query)
        .toArray()
    } catch (error) {
      console.log(error)
    }
  }

  async get(collection, id) {
    try {
      const db = await this.connect()
      return await db
        .collection(collection)
        .findOne({ _id: ObjectID(id) })
    } catch (error) {
      console.log(error)
    }
  }

  async create(collection, data) {
    try {
      const db = await this.connect()
      return await db
        .collection(collection)
        .insertOne(data)
        .then(inserted => inserted.insertedId)
    } catch (error) {
      console.log(error)
    }
  }

  async update(collection, id, data) {
    try {
      const db = await this.connect()
      return await db
        .collection(collection)
        .updateOne({ _id: ObjectID(id) }, { $set: data }, { upsert: true })
        .then(upserted => upserted.upsertedId || id)
    } catch (error) {
      console.log(error)
    }
  }

  async delete(collection, id) {
    try {
      const db = await this.connect()
      return await db
        .collection(collection)
        .deleteOne({ _id: ObjectID(id) })
        .then(() => id)
    } catch (error) {
      console.log(error)
    } 
  }
}

module.exports = MongoLib