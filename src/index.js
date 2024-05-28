import express from 'express'
import { PORT } from './Config/config.js'
import users from './Routes/users.route.js'
import session from './Routes/session.router.js'
import { acceptCors } from './middeleware/cors.js'

const app = express()

app.use(express.json())
app.use(acceptCors)

app.use('/login', session)
app.use('/perfil', users)

app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}/login`))
