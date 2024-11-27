import path from 'path'
import http from 'http'
import cors from 'cors'
import express from 'express'
import dotenv from 'dotenv'
import { coodRoutes } from './api/code/code.ruotes.js'

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

app.use('/api/code', coodRoutes)

const port = process.env.PORT || 3030

server.listen(port, () => {
  console.log('Server is running on port:' + port)
})
