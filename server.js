import path from 'path'
import http from 'http'
import cors from 'cors'
import express from 'express'
import dotenv from 'dotenv'
import { coodeRoutes } from './api/code/code.ruotes.js'
import { roomRoutes } from './api/room/room.routes.js'

dotenv.config()
const app = express()
const server = http.createServer(app)

app.use(express.json())

if (process.env.NODE_ENV === 'production') {
  app.use(express.static(path.resolve('puplic')))
} else {
  const corsOptions = {
    origin: [
      'http://127.0.0.1:3000',
      'http://localhost:3000',
      'http://127.0.0.1:5173',
      'http://localhost:5173',
    ],
  }
  app.use(cors(corsOptions))
}

app.get('/', (req, res) => {
  res.send('Welcome to Moveo App :)')
})

app.use('/api/code', coodeRoutes)
app.use('/api/room', roomRoutes)

const port = process.env.PORT || 3030

server.listen(port, () => {
  console.log('Server is running on port:' + port)
})
