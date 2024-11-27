import { dbService } from '../../services/db.service.js'

export const codeService = {
  query,
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
