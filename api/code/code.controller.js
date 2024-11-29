import { codeService } from './code.service.js'

export async function getCodes(req, res) {
  try {
    const codes = await codeService.query()
    res.json(codes)
  } catch (err) {
    console.log('Failed to get codes:', err)
    res.status(404).json({ message: 'No codes found' })
  }
}

export async function getCodeById(req, res) {
  const { id } = req.params
  try {
    const code = await codeService.getCodeById(id)
    res.json(code)
  } catch (err) {
    console.log('Failed to get solution:', err)
    res.status(404).json({ message: 'No solution found' })
  }
}
