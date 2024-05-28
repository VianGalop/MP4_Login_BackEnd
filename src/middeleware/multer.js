import multer from 'multer'
import { dirname, join } from 'path'
import { fileURLToPath } from 'url'

const CURRRENT_DIR = dirname(fileURLToPath(import.meta.url))

/* console.log(CURRRENT_DIR)
console.log('Dirrec', join(path.dirname(CURRRENT_DIR), 'uploads')) */

export const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads/') // La carpeta donde se guardarán los archivos
  },
  filename: function (req, file, cb) {
    cb(null, `${Date.now()}-${file.originalname}`) // El nombre original del archivo
  }
})

export const uploadPhoto = multer({
  storage,
  dest: join(CURRRENT_DIR, '../uploads'),
  fileFilter: (req, file, cb) => {
    if (file.mimetype.startsWith('image/')) { // tipo archivo que recibe
      cb(null, true)
    } else {
      cb(new Error('Solo se permiten imagenes'))
    }
  }
})
