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
          student: null,
          watchers: [],
          currentCode: '',
        }
        rooms.set(roomId, roomData)
      }
      let role
      if (!roomData.mentor) {
        // The first user is the mentor
        role = 'mentor'
        roomData.mentor = socket.id
      } else if (!roomData.student) {
        // The second user is the student.
        role = 'student'
        roomData.student = socket.id
      } else {
        // Every additional user is a watcher
        role = 'watcher'
        roomData.watchers.push(socket.id)
      }

      socket.role = role
      socket.roomId = roomId
      socket.join(roomId)

      // Send the role to the user
      socket.emit('user-role', role)

      const roomStatus = {
        isStudentPresent: Boolean(roomData.student),
        watcherCount: roomData.watchers.length,
        isMentor: Boolean(roomData.mentor),
      }
      gIo.to(roomId).emit('room-status', roomStatus)

      //Update code
      socket.on('code-update', ({ roomId, updatedCode }) => {
        const room = rooms.get(roomId)
        room.currentCode = updatedCode
        gIo.to(roomId).emit('code-changed', updatedCode)
      })

      socket.on('show-modal', ({ roomId, content }) => {
        gIo.to(roomId).emit('show-modal', content)
      })
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
        roomData.student = null
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

      // Update the room status
      const roomStatus = {
        isStudentPresent: Boolean(roomData.student),
        watcherCount: roomData.watchers.length,
        isMentor: Boolean(roomData.mentor),
      }

      gIo.to(roomId).emit('room-status', roomStatus)

      console.log(`user  leave from room:${roomId}`)
    })
  })
}
