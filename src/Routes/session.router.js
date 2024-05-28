import { Router } from 'express'
import { createLogin, enterLogin } from '../controllers/session.controller.js'

const router = Router()

/* crear una registro login */
router.post('/create', createLogin)

/* entrada a session */
router.post('/enter', enterLogin)

export default router
