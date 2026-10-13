const app = require('./app');

const PUERTO = process.env.PORT || 3000;

app.listen(PUERTO, () => {
  console.log(`API escuchando en http://localhost:${PUERTO}`);
  console.log(`Documentación Swagger en http://localhost:${PUERTO}/api-docs`);
});
