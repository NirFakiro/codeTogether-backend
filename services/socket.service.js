import { Server } from 'socket.io'

var gIo = null

export function setupSocketAPI(http) {
  gIo = new Server(http, {
    cors: {
      origin: '*',
    },
  })

  const rooms = new Map()

  gIo.on('connection', (socket) => {
    console.log(`New connected socket[id:${socket.id}]`)

    socket.on('disconnect', () => {
      console.log(`Socket disconnected [id: ${socket.id}]`)
    })

    socket.on('join-room', (roomId) => {
      let roomData = rooms.get(roomId)

      if (!roomData) {
        // If the room does not exist, create it
        roomData = {
          mentor: null,
          students: [],
          watchers: [],
        }
        rooms.set(roomId, roomData)
      }
      let role
      if (!roomData.mentor) {
        // The first user is the mentor
        role = 'mentor'
        roomData.mentor = socket.id
      } else if (roomData.students.length === 0) {
        // The second user is the mentor.
        role = 'student'
        roomData.students.push(socket.id)
      } else {
        // Every additional user is a watcher
        role = 'watcher'
        roomData.watchers.push(socket.id)
        console.log('watcher:', roomData.watchers)
      }

      socket.role = role
      socket.roomId = roomId
      socket.join(roomId)

      // Send the role to the user
      socket.emit('user-role', { userId: socket.id, role })

      // Update the watcher count
      const watcherCount = roomData.watchers.length
      gIo.to(roomId).emit('watcher-count', watcherCount)

      console.log(`Socket join-room [id: ${roomId}] `)
    })

    //Update code
    socket.on('code-update', (roomId, newCode) => {
      gIo.to(roomId).emit('code-changed', newCode)
    })

    // Show if student opened the solution
    socket.on('show-solution', (roomId, solution) => {
      gIo.to(roomId).emit('display-solution', solution)
    })

    // Show result
    socket.on('show-result', (roomId, result) => {
      gIo.to(roomId).emit('display-solution', result)
    })

    // User disconnect
    socket.on('disconnect-from-room', () => {
      const { role, roomId } = socket

      if (!roomId) return

      const roomData = rooms.get(roomId)
      if (!roomData) return
      // Update the role
      if (role === 'mentor') {
        gIo.to(roomId).emit('redirect-to-lobby')
        rooms.delete(roomId)
      } else if (role === 'student') {
        roomData.students = roomData.students.filter((id) => id !== socket.id)
      } else if (role === 'watcher') {
        roomData.watchers = roomData.watchers.filter((id) => id !== socket.id)
      }

      // If the room  is empty, delete it
      if (
        !roomData.mentor &&
        roomData.students.length === 0 &&
        roomData.watchers.length === 0
      ) {
        rooms.delete(roomId)
      }

      // Update the watcher
      const watcherCount = Array.isArray(roomData.watchers)
        ? roomData.watchers.length
        : 0

      gIo.to(roomId).emit('watcher-count', watcherCount)

      console.log(`user ${socket.id} disconnected from room:${roomId}`)
    })
  })
}
