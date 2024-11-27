import express from 'express'
import {
  createRoom,
  deleteRoom,
  getRoomById,
  joinRoom,
} from './room.controller.js'

const router = express.Router()

router.post('/', createRoom)
router.get('/:id', getRoomById)
router.delete('/:id', deleteRoom)
router.post('/:id/joinRoom,', joinRoom)

export { router as roomRoutes }
