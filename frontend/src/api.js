const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:3000';
const RECURSO = `${API_URL}/api/libros`;

async function leerError(respuesta, mensajePorDefecto) {
  try {
    const cuerpo = await respuesta.json();
    return cuerpo.mensaje || mensajePorDefecto;
  } catch {
    return mensajePorDefecto;
  }
}

export async function obtenerLibros() {
  const respuesta = await fetch(RECURSO);
  if (!respuesta.ok) {
    throw new Error(await leerError(respuesta, 'No se pudo cargar la lista de libros'));
  }
  return respuesta.json();
}

export async function crearLibro({ titulo, autor }) {
  const respuesta = await fetch(RECURSO, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ titulo, autor }),
  });
  if (!respuesta.ok) {
    throw new Error(await leerError(respuesta, 'No se pudo crear el libro'));
  }
  return respuesta.json();
}

export async function eliminarLibro(id) {
  const respuesta = await fetch(`${RECURSO}/${id}`, { method: 'DELETE' });
  if (!respuesta.ok) {
    throw new Error(await leerError(respuesta, 'No se pudo eliminar el libro'));
  }
}
