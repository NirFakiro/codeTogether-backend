import express from 'express'
import { getCodes } from './code.controller.js'

const router = express.Router()

router.get('/', getCodes)

export { router as coodRoutes }
