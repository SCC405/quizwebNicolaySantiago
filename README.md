# Biblioteca - API REST y frontend

Aplicación de biblioteca con dos partes independientes: una API REST hecha con **Node.js + Express**
documentada con **Swagger/OpenAPI**, y un frontend en **React** que la consume.

El frontend no usa ningún framework de UI: los estilos son CSS propio, con CSS Grid y Flexbox.

Cada libro tiene `id`, `titulo` y `autor`.

## Estructura

```
biblioteca-fullstack/
├── backend/           API REST con Express + Swagger
│   └── src/
│       ├── controllers/   lógica de cada endpoint
│       ├── data/          almacenamiento en memoria
│       ├── docs/          configuración de Swagger
│       ├── routes/        rutas y anotaciones OpenAPI
│       ├── app.js         configuración de Express (CORS, JSON, rutas)
│       └── server.js      arranque del servidor
└── frontend/          Aplicación React (Vite) con CSS propio
    └── src/
        ├── components/    formulario y listado de libros
        ├── api.js         llamadas a la API
        ├── estilos.css    hoja de estilos propia (sin framework de UI)
        └── App.jsx        pantalla principal
```

## Requisitos

- Node.js 18 o superior
- npm

## Cómo ejecutarlo

Se necesitan dos terminales, una para cada parte.

### 1. Backend

```bash
cd backend
npm install
npm start
```

- API: http://localhost:3000
- Documentación Swagger: http://localhost:3000/api-docs
- Especificación OpenAPI en JSON: http://localhost:3000/api-docs.json

### 2. Frontend

```bash
cd frontend
npm install
npm run dev
```

- Aplicación: http://localhost:5173

Si la API corre en otro puerto o en otra máquina, se copia `.env.example` a `.env` y se cambia la
variable `VITE_API_URL`.

## Endpoints

| Método | Ruta               | Descripción             | Respuestas                                                      |
| ------ | ------------------ | ----------------------- | --------------------------------------------------------------- |
| GET    | `/api/libros`      | Lista todos los libros  | `200` con el arreglo de libros                                   |
| POST   | `/api/libros`      | Crea un libro           | `201` con el libro creado, `400` si falta el título o el autor   |
| DELETE | `/api/libros/{id}` | Elimina un libro por id | `204` sin contenido, `404` si el libro no existe                 |

Ejemplos:

```bash
# Listar
curl http://localhost:3000/api/libros

# Crear
curl -X POST http://localhost:3000/api/libros \
  -H "Content-Type: application/json" \
  -d '{"titulo":"Rayuela","autor":"Julio Cortazar"}'

# Crear sin autor -> 400
curl -X POST http://localhost:3000/api/libros \
  -H "Content-Type: application/json" \
  -d '{"titulo":"Sin autor"}'

# Eliminar
curl -X DELETE http://localhost:3000/api/libros/1

# Eliminar un id inexistente -> 404
curl -X DELETE http://localhost:3000/api/libros/999
```

## Detalles de la implementación

- **CORS** habilitado en el backend con el paquete `cors`, para que el frontend pueda consumir la
  API desde otro puerto.
- **Datos en memoria**: los libros viven en un arreglo dentro del proceso. Al reiniciar el servidor
  la lista vuelve a los tres libros de ejemplo.
- **Validación**: el `POST` responde `400` cuando el título o el autor faltan o llegan vacíos, e
  indica en la respuesta qué campos fallaron.
- **Frontend**: React con Vite. Muestra la lista en una grilla de tarjetas, tiene un formulario
  para crear libros y un botón de eliminar en cada tarjeta, con estados de carga y mensajes de
  error.
- **Estilos sin framework de UI**: toda la presentación está en `frontend/src/estilos.css`, escrita
  a mano. La grilla de libros usa CSS Grid con `repeat(auto-fill, minmax(220px, 1fr))`, así que las
  tarjetas se reacomodan solas según el ancho de la pantalla, y el layout de dos columnas pasa a
  una sola por debajo de 900px con una media query. Los colores están centralizados en variables
  CSS.
