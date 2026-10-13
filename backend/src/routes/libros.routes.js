const { Router } = require('express');
const controlador = require('../controllers/libros.controller');

const router = Router();

/**
 * @openapi
 * components:
 *   schemas:
 *     Libro:
 *       type: object
 *       properties:
 *         id:
 *           type: string
 *           example: "1"
 *         titulo:
 *           type: string
 *           example: "Cien años de soledad"
 *         autor:
 *           type: string
 *           example: "Gabriel García Márquez"
 *     NuevoLibro:
 *       type: object
 *       required: [titulo, autor]
 *       properties:
 *         titulo:
 *           type: string
 *           example: "Rayuela"
 *         autor:
 *           type: string
 *           example: "Julio Cortázar"
 *     Error:
 *       type: object
 *       properties:
 *         mensaje:
 *           type: string
 *         campos:
 *           type: array
 *           items:
 *             type: string
 */

/**
 * @openapi
 * /api/libros:
 *   get:
 *     summary: Lista todos los libros
 *     tags: [Libros]
 *     responses:
 *       200:
 *         description: Lista de libros
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Libro'
 */
router.get('/', controlador.listarLibros);

/**
 * @openapi
 * /api/libros:
 *   post:
 *     summary: Crea un libro nuevo
 *     tags: [Libros]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/NuevoLibro'
 *     responses:
 *       201:
 *         description: Libro creado
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Libro'
 *       400:
 *         description: Falta el título o el autor
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 */
router.post('/', controlador.crearLibro);

/**
 * @openapi
 * /api/libros/{id}:
 *   delete:
 *     summary: Elimina un libro por su id
 *     tags: [Libros]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Identificador del libro
 *     responses:
 *       204:
 *         description: Libro eliminado, sin contenido de respuesta
 *       404:
 *         description: El libro no existe
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 */
router.delete('/:id', controlador.eliminarLibro);

module.exports = router;
