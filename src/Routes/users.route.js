import { Router } from 'express'
import { createPerfil, getPerfil } from '../controllers/users.controller.js'
import { uploadPhoto } from '../middlewares/multer.js'
import logueado from '../middlewares/authentication.js'

const router = Router()

/* Ver datos perfil */
router.get('/see/:id', logueado, getPerfil)

/* Datos del perfil */
/* router.post('/data', upload.single('photo'), createPerfil) */
router.patch('/updated/:id', logueado, uploadPhoto.single('photo'), createPerfil)

export default router
