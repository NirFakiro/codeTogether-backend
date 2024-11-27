import { codeService } from './code.service.js'

export async function getCodes(req, res) {
  try {
    const codes = await codeService.query()
    res.json(codes)
  } catch (err) {
    console.log('Failed to get codes:', err)
    throw err
  }
}
