const rooms = {}
let roomIdCounter = 0

export const roomService = {
  createRoom,
  getRoomById,
  joinRoom,
  deleteRoom,
}

async function createRoom(codeId) {
  const roomId = roomIdCounter++
  const room = {
    id: codeId,
    codeId: codeId,
    isMentor: true,
    student: [],
    createdAt: Date.now(),
  }
  rooms[roomId] = room
  return room
}

async function getRoomById(roomId) {
  return rooms[roomId] || null
}

async function joinRoom(roomId) {
  const room = rooms[roomId]

  rooms[roomId] = room
  return room
}

async function deleteRoom(roomId) {
  delete rooms[roomId]
}
