import express from 'express'
import { PORT } from './Config/config.js'
import users from './Routes/users.route.js'
import session from './Routes/session.router.js'
import { acceptCors } from './middlewares/cors.js'
import swaggerJSDoc from 'swagger-jsdoc'
import swaggerOptions from '../swagger/swagger.js'
import swaggerUi from 'swagger-ui-express'
const app = express()

app.use(express.json())
/* app.use(morgan('dev')) */

app.use(acceptCors)

app.use('/login', session)
app.use('/perfil', users)

const swaggerDocs = swaggerJSDoc(swaggerOptions)
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocs))
app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}/login`))
