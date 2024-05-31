import path from 'path'
import { pool } from '../Config/db.js'
import bcrypt from 'bcrypt'
import fs from 'fs/promises'

export const getPerfil = async (req, res) => {
  const id = req.params.id
  try {
    /*   const decoded = jwt.decode(token)
    console.log('decoded', decoded) */
    const [usuario] = await pool.execute('SELECT * FROM users WHERE id = ?', [id])
    if (usuario.length <= 0) {
      return res.status(405).json({ message: 'No existe informacion del usuario' })
    }
    /* const ruta = path.resolve(`./uploads/${usuario[0].photo}`)
    await fs.access(ruta, fs.constants.F_OK)
    res.sendFile(ruta) */
    res.json(usuario)
  } catch (error) {
    return res.status(500).json({ message: 'Algo salio mal' })
  }
}

export const createPerfil = async (req, res) => {
  try {
    const idUser = req.params.id
    const { name, biography, phone, email, password } = req.body
    /* const photo = req.file */

    const [usuario] = await pool.execute('SELECT * FROM users WHERE id = ?', [idUser])
    /* console.log(photo)
    if (!photo) return res.status(400).json({ message: 'No se envió ninguna photo' }) */
    if (usuario.length <= 0) return res.status(405).json({ message: 'Usuario no encontrado' })
    if (!name || !biography || !phone || !email || !password) return res.status(400).json({ message: 'Error! Falta informacion para el registro' })
    if (!email.includes('@')) return res.status(400).json({ message: 'Error! Verifique su correo...' })
    if (password?.length < 8 || !(password.match(/[A-Z]/) && password.match(/[0-9]/))) return res.status(400).json({ message: 'Error! La contraseña debe tener al menos 8 caracteres (letras y numeros) y al menos una letra mayuscula' })

    // Encriptar password
    // encriptar la nueva, comparar con la anterior si son similares no cambiarla sino cambiarla nueva encriptada
    // Comparar la contraseña encripatada
    let newPass = ' '
    const validaPass = await bcrypt.compare(password, usuario[0].password)
    if (!validaPass) {
      newPass = await bcrypt.hash(password, 10)
    } else {
      newPass = usuario[0].password
    }

    // Ingresar los datos a la db
    const sql = 'UPDATE users SET name = ?, biography = ?, phone = ?, email = ?,password = ? WHERE id = ?'
    const result = await pool.execute(sql, [name, biography, phone, email, newPass, idUser])

    // Validar el id del registro insertado
    if (result.affectedRows === 0) {
      return res.status(501).json({ message: 'Error, al crear el perfil' })
    }

    // Traer el nombre del usuario insertado
    const [userName] = await pool.execute('SELECT name FROM users WHERE id = ?', [idUser])

    // Mensaje al cliente
    res.status(200).json({ message: `Perfil Creado de ${userName[0].name}` })
  } catch (error) {
    return res.status(400).json({ message: 'Error! Algo salio mal' })
  }
}
