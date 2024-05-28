import { Router } from 'express'
import { createPerfil, getPerfil } from '../controllers/users.controller.js'
/* import { verifyToken } from '../middeleware/authentication.js' */

const router = Router()

/* Ver datos perfil */
router.get('/see', getPerfil)

/* Datos del perfil */
/* router.post('/data', upload.single('photo'), createPerfil) */
router.post('/update', createPerfil)

export default router
