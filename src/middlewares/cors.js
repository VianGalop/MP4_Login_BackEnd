import { corsAccept } from '../Config/config.js'

export const acceptCors = (req, res, next) => {
  const { origin } = req.headers

  if (!origin || corsAccept.includes(origin)) {
    res.setHeader('Access-Control-Allow-Origin', origin ?? '*')
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type')
    res.setHeader('Access-Control-Allow-Methods', 'GET,HEAD,PUT,PATCH,POST,DELETE')
    next()
  } else {
    res.status(403).json({ message: 'CORS no permitido' })
  }
}
