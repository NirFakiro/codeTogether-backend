import { Server } from 'socket.io'

export function setupSocketAPI(http) {
  gIo = new Server(http, {
    origin: '*',
  })

  gIo.on('connection', (socket) => {
    console.log(`New connected socket[id:${socket.id}]`)

    socket.on('join-room', (roomId) => {
      const userInRoom = gIo.sockets.adapter.rooms.get(roomId)
      const isRommEmpty = !userInRoom

      const role = isRommEmpty ? 'mentor' : 'student'
      socket.role = role
      socket.roomId = roomId

      socket.join(roomId)
      socket.emit('user-role', { userId: socket.id, role })

      const numberOfWatchers = userInRoom ? userInRoom.size : 0
      gIo.to(roomId).emit('whatcher-count', numberOfWatchers)

      console.log(`user ${socket.id} assigned role: ${role}`)
    })

    socket.on('code-update', (roomId, newCode) => {
      gIo.to(roomId).emit('code-changed', newCode)
    })

    socket.on('show-solution', (roomId, solution) => {
      gIo.to(roomId).emit('display-solution', solution)
    })

    socket.on('disconnect', () => {
      const { role, roomId } = socket

      const userInRoom = gio.socket.adapter.rooms.get(roomId)
      if (!userInRoom) return

      if (role === 'mentor') {
        gIo.to(roomId).emit('redirect-to-lobby')
      } else {
        const updateUserInRoom = userInRoom.size
        gIo.to(roomId).emit('watcher-count', updateUserInRoom)
      }
    })
  })
}
