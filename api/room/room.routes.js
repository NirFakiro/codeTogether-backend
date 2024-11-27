import express from 'express'
import { createRoom, deleteRoom, getRoomById } from './room.controller.js'

const router = express.Router()

router.post('/', createRoom)
router.get('/:id', getRoomById)
router.delete('/:id', deleteRoom)

export { router as roomRoutes }
