const express = require('express');
const cors = require('cors');
const swaggerUi = require('swagger-ui-express');

const librosRoutes = require('./routes/libros.routes');
const especificacionSwagger = require('./docs/swagger');

const app = express();

// CORS abierto para que el frontend pueda consumir la API desde otro puerto.
app.use(cors());
app.use(express.json());

app.use('/api/libros', librosRoutes);

// Documentación interactiva en /api-docs y el JSON crudo en /api-docs.json
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(especificacionSwagger));
app.get('/api-docs.json', (req, res) => res.json(especificacionSwagger));

app.get('/', (req, res) => {
  res.json({ mensaje: 'API de Biblioteca en línea', documentacion: '/api-docs' });
});

app.use((req, res) => {
  res.status(404).json({ mensaje: 'Ruta no encontrada' });
});

module.exports = app;
