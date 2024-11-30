import { MongoClient } from 'mongodb'

export const dbService = { getCollection }

var dbConn = null
const DB_URL =
  'mongodb+srv://fakironir:XYFQPJeFKJOPxUqi@cluster2.hsjbh.mongodb.net/?retryWrites=true&w=majority&appName=Cluster2'

const DB_NAME = 'CodeTogether'
async function getCollection(collectionName) {
  try {
    const db = await _connect()
    const collection = await db.collection(collectionName)
    return collection
  } catch (err) {
    console.log('Cannot get collection:', err)

    throw err
  }
}

async function _connect() {
  if (dbConn) return dbConn
  try {
    const client = await MongoClient.connect(DB_URL)
    dbConn = client.db(DB_NAME)
    return dbConn
  } catch (err) {
    console.log('Cannot connect to DB:', err)
    throw err
  }
}
