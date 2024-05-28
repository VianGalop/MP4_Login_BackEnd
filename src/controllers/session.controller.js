import { pool } from '../Config/db.js'
import bcrypt from 'bcrypt'
import { generateToken } from '../middeleware/authentication.js'
/* import { storage } from '../middeleware/multer.js'
import { SECRET_KEY } from '../Config/config.js' */

export const createLogin = async (req, res) => {
  try {
    const { email, password } = req.body

    if (!email || !password) return res.status(400).json({ message: 'Error! Falta informacion para registrarse...' })
    if (!email.includes('@')) return res.status(400).json({ message: 'Email invalido! Verifique su email...' })
    if (password.length < 8 || !(password.match(/[A-Z]/) && password.match(/[0-9]/))) return res.status(400).json({ message: 'Error! La contraseña debe tener al menos 8 caracteres (letras y numeros) y al menos una letra mayuscula' })

    // Encriptar password
    const passHash = await bcrypt.hash(password, 10)

    // Ingresar los datos a la db
    const sql = 'INSERT INTO users (email, password) VALUES (?, ?)'
    const [result] = await pool.execute(sql, [email, passHash])

    // Validar el id del registro insertado y traer datos
    if (result.affectedRows === 1) {
      const [user] = await pool.execute('SELECT email FROM users WHERE id = ?', [result.insertId])
      console.log(user[0].email)
      return res.status(200).json({ message: `Registro Exitoso... Bienvenido ${user[0].email}` })
    }

    return res.status(500).json({ message: 'Error, No se puede registrar...' })
  } catch (error) {
    console.log(error)
    let message = 'Algo salio mal...'
    let statusCode = 500

    // Validar si el error es por un username duplicado. Si es así, borrar la imagen y cambiar el mensaje y código de error.
    if (error?.errno === 1062) {
      message = 'El email ya exite...'
      statusCode = 402
    }
    res.status(statusCode).json({ message })
  }
}

export const enterLogin = async (req, res) => {
  const { email, password } = req.body
  try {
    if (!email || !password) return res.status(400).json({ message: 'Falta informacion' })

    const [usuario] = await pool.execute('SELECT * FROM users WHERE email = ?', [email])
    if (!usuario) return res.status(400).json({ message: 'Correo inválido' })

    // Comparar la contraseña encripatada
    const isValidPassword = await bcrypt.compare(password, usuario[0].password)

    if (isValidPassword) {
      const token = generateToken({ idUser: usuario.id })
      const nDatos = { token, data: usuario }

      return res.status(200).json(nDatos)
    } else {
      return res.status(400).json({ message: 'Credenciales incorrectas' })
    }
  } catch (error) {
    console.log(error)
    res.status(500).json({ message: 'Algo salio mal' })
  }
}
