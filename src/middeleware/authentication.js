import { SECRET_KEY } from '../Config/config.js'
import jwt from 'jsonwebtoken'

export const generateToken = (payload) => {
  return jwt.sign(payload, SECRET_KEY)
}

export const verifyToken = (req, res, next) => {
  const token = req.headers.authorization

  if (!token == null) { return res.status(403).json({ message: 'Token requerido' }) }

  const authorization = jwt.verify(token, SECRET_KEY, (err, user) => {
    if (err) return res.status(400).json({ message: 'Token invalido' })
  })

  req.token = authorization
  next()
}
