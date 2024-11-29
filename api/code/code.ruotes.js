import express from 'express'
import { getCodeById, getCodes } from './code.controller.js'

const router = express.Router()

router.get('/', getCodes)
router.get('/:id', getCodeById)

export { router as coodeRoutes }
