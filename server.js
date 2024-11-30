import path from 'path'
import http from 'http'
import cors from 'cors'
import express from 'express'
import dotenv from 'dotenv'

import { coodeRoutes } from './api/code/code.ruotes.js'

import { setupSocketAPI } from './services/socket.service.js'

dotenv.config()
const app = express()
const server = http.createServer(app)

app.use(express.json())

if (process.env.NODE_ENV === 'production') {
  app.use(express.static(path.resolve('public')))
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

app.use('/api/code', coodeRoutes)

setupSocketAPI(server)

app.get('/**', (req, res) => {
  console.log('GET request received')
  res.sendFile(path.resolve('public/index.html'))
})

const port = 3000

server.listen(port, () => {
  console.log('Server is running on port:' + port)
})
