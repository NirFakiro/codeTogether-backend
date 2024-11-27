const rooms = {}
let roomIdCounter = 0

export const roomService = {
  createRoom,
  getRoomById,
  deleteRoom,
}

async function createRoom(codeId) {
  const roomId = roomIdCounter++
  const room = {
    id: roomId,
    codeId,
    mentor: null,
    student: [],
    createdAt: Date.now(),
  }
  rooms[roomId] = room
  return room
}

async function getRoomById(roomId) {
  return rooms[roomId] || null
}

async function deleteRoom(roomId) {
  delete rooms[roomId]
}
