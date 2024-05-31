import multer from 'multer'

export const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads/') // La carpeta donde se guardarán los archivos
  },
  filename: function (req, file, cb) {
    cb(null, `${Date.now()}-${file.originalname}`) // El nombre original del archivo
  }
})

const imgPhoto = (req, file, cb) => {
  if (file.mimetype.startsWith('image/')) {
    cb(null, true)
  } else {
    cb(new Error('Solo se permiten imágenes'))
  }
}

export const uploadPhoto = multer({ storage, fileFilter: imgPhoto })
