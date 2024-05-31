import { Router } from 'express'
import { createLogin, enterLogin } from '../controllers/session.controller.js'

const router = Router()

/* crear una registro login */
router.post('/', createLogin)

/**
 * @openapi
 * /login/enter:
 *   post:
 *     summary: Entrar al login
 *     tags:
 *       - enter
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *                 format: email
 *               password:
 *                 type: string
 *                 format: password
 *     responses:
 *       200:
 *         description: usuario proporciona su email y password
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Usuario loguea con su usuario
 *                 newUser:
 *                   type: object
 *                   properties:
 *                     email:
 *                       type: string
 *                       example: miEmail@example.com
*                      password:
*                       type: string
*                       example: miPassword123
        400:
 *         description: Falta informacion para completar la entrada de Login
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *       500:
 *         description: Error interno
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 */
router.post('/enter', enterLogin)

export default router
