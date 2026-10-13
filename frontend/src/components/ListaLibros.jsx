export default function ListaLibros({ libros, onEliminar, idEliminando }) {
  if (libros.length === 0) {
    return (
      <p className="aviso aviso--info" role="status">
        Todavía no hay libros registrados. Agrega el primero con el formulario.
      </p>
    );
  }

  return (
    <ul className="grilla">
      {libros.map((libro) => (
        <li className="tarjeta libro" key={libro.id}>
          <span className="libro__id">#{libro.id}</span>
          <h3 className="libro__titulo">{libro.titulo}</h3>
          <p className="libro__autor">{libro.autor}</p>

          <button
            type="button"
            className="boton boton--peligro boton--pequeno libro__accion"
            onClick={() => onEliminar(libro.id)}
            disabled={idEliminando === libro.id}
          >
            {idEliminando === libro.id ? 'Eliminando...' : 'Eliminar'}
          </button>
        </li>
      ))}
    </ul>
  );
}
