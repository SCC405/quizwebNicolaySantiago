const repositorio = require('../data/librosRepository');

// GET /api/libros -> 200 con la lista completa
function listarLibros(req, res) {
  res.status(200).json(repositorio.listar());
}

// POST /api/libros -> 201 con el libro creado, 400 si falta titulo o autor
function crearLibro(req, res) {
  const { titulo, autor } = req.body ?? {};

  const errores = [];
  if (typeof titulo !== 'string' || titulo.trim() === '') errores.push('titulo');
  if (typeof autor !== 'string' || autor.trim() === '') errores.push('autor');

  if (errores.length > 0) {
    return res.status(400).json({
      mensaje: 'Faltan campos obligatorios o están vacíos',
      campos: errores,
    });
  }

  const libro = repositorio.crear({ titulo: titulo.trim(), autor: autor.trim() });
  return res.status(201).json(libro);
}

// DELETE /api/libros/{id} -> 204 si se elimina, 404 si no existe
function eliminarLibro(req, res) {
  const eliminado = repositorio.eliminar(req.params.id);

  if (!eliminado) {
    return res.status(404).json({ mensaje: `No existe un libro con id ${req.params.id}` });
  }

  return res.status(204).send();
}

module.exports = { listarLibros, crearLibro, eliminarLibro };
