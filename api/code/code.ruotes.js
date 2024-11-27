import express from 'express'
import { getCodes, getSolution } from './code.controller.js'

const router = express.Router()

router.get('/', getCodes)
router.get('/:id', getSolution)

export { router as coodeRoutes }
