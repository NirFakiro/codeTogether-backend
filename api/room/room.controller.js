import { roomService } from './room.service.js'

export async function createRoom(req, res) {
  const { codeId } = req.body

  try {
    const newRoom = await roomService.createRoom(codeId)
    return res.json(newRoom)
  } catch (err) {
    console.log('Failed to create room:', err)
    res.status(404).json({ message: 'Failed to create room' })
  }
}

export async function getRoomById(req, res) {
  const { id } = req.params
  try {
    const room = await roomService.getRoomById(id)
    return res.json(room)
  } catch (err) {
    console.log('Failed to get room:', err)
    res.status(404).json({ message: 'Failed to get room' })
  }
}

export async function deleteRoom(req, res) {
  const { id } = req.params
  try {
    await roomService.deleteRoom(id)
    res.status(200).json({ message: `Room  ${id}deleted` })
  } catch (error) {
    res.status(404).json({ message: 'Error deleting room' })
  }
}
