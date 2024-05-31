const swaggerOptions = {
  swaggerDefinition: {
    openapi: '3.0.0',
    info: {
      title: 'File Upload API',
      version: '1.0.0',
      description: 'API para subir archivos PNG'
    },
    servers: [
      {
        url: 'http://localhost:3000'
      }
    ]
  },
  apis: ['./server.js'] // Archivo donde Swagger buscará la documentación
}

export default swaggerOptions
