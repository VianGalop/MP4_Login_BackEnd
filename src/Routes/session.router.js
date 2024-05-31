import { Router } from 'express'
import { createLogin, enterLogin } from '../controllers/session.controller.js'

const router = Router()

/* crear una registro login */
router.post('/', createLogin)

router.post('/enter', enterLogin)

export default router
