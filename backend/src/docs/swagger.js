const path = require('path');
const swaggerJsdoc = require('swagger-jsdoc');

// Glob con barras normales: así funciona igual en Windows, Linux y macOS.
const rutaAnotaciones = path.join(__dirname, '..', 'routes', '*.js').split(path.sep).join('/');

const especificacion = swaggerJsdoc({
  definition: {
    openapi: '3.0.3',
    info: {
      title: 'API de Biblioteca',
      version: '1.0.0',
      description:
        'API REST para administrar los libros de una biblioteca. Cada libro tiene id, título y autor.',
    },
    servers: [{ url: 'http://localhost:3000', description: 'Servidor local' }],
    tags: [{ name: 'Libros', description: 'Operaciones sobre los libros' }],
  },
  apis: [rutaAnotaciones],
});

module.exports = especificacion;
