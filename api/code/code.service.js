import { ObjectId } from 'mongodb'
import { dbService } from '../../services/db.service.js'

export const codeService = {
  query,
  getSolutionById,
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

async function getSolutionById(codeId) {
  try {
    const collection = await dbService.getCollection(CODE_COLLECTION_NAME)
    const criteria = { _id: ObjectId.createFromHexString(codeId) }
    const currCode = await collection.findOne(criteria)

    return currCode.solution
  } catch (err) {
    console.log('Faild to get solution from codeId: ', codeId, err)
    throw err
  }
}
