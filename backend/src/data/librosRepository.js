// Almacenamiento en memoria. Se reinicia cada vez que se levanta el servidor.
let secuencia = 0;

const libros = [];

function siguienteId() {
  secuencia += 1;
  return String(secuencia);
}

function listar() {
  return libros;
}

function buscarPorId(id) {
  return libros.find((libro) => libro.id === id);
}

function crear({ titulo, autor }) {
  const libro = { id: siguienteId(), titulo, autor };
  libros.push(libro);
  return libro;
}

function eliminar(id) {
  const indice = libros.findIndex((libro) => libro.id === id);
  if (indice === -1) return false;
  libros.splice(indice, 1);
  return true;
}

// Datos iniciales para que la lista no arranque vacia.
crear({ titulo: 'Cien años de soledad', autor: 'Gabriel García Márquez' });
crear({ titulo: 'La vorágine', autor: 'José Eustasio Rivera' });
crear({ titulo: 'Delirio', autor: 'Laura Restrepo' });

module.exports = { listar, buscarPorId, crear, eliminar };
