import { ObjectId } from 'mongodb'
import { dbService } from '../../services/db.service.js'

export const codeService = {
  query,
  getCodeById,
}

const CODE_COLLECTION_NAME = 'code_blocks'

async function query() {
  try {
    const collection = await dbService.getCollection(CODE_COLLECTION_NAME)
    const codes = await collection.find().toArray()
    return codes
  } catch (err) {
    console.log('Failed to fetch codes:', err)
    throw err
  }
}

async function getCodeById(codeId) {
  try {
    const collection = await dbService.getCollection(CODE_COLLECTION_NAME)
    const criteria = { _id: ObjectId.createFromHexString(codeId) }
    const currCode = await collection.findOne(criteria)

    return currCode
  } catch (err) {
    console.log('Faild to get solution from codeId: ', codeId, err)
    throw err
  }
}
