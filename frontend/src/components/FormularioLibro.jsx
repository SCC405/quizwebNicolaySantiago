import { useState } from 'react';

export default function FormularioLibro({ onCrear, deshabilitado }) {
  const [titulo, setTitulo] = useState('');
  const [autor, setAutor] = useState('');
  const [errorLocal, setErrorLocal] = useState('');

  async function manejarEnvio(evento) {
    evento.preventDefault();

    if (titulo.trim() === '' || autor.trim() === '') {
      setErrorLocal('El título y el autor son obligatorios');
      return;
    }

    setErrorLocal('');
    const creado = await onCrear({ titulo: titulo.trim(), autor: autor.trim() });

    if (creado) {
      setTitulo('');
      setAutor('');
    }
  }

  return (
    <section className="tarjeta">
      <h2 className="tarjeta__titulo">Agregar un libro</h2>

      <form onSubmit={manejarEnvio} noValidate>
        <div className="campo">
          <label htmlFor="titulo" className="campo__etiqueta">
            Título
          </label>
          <input
            id="titulo"
            type="text"
            className="campo__entrada"
            placeholder="Ej: Rayuela"
            value={titulo}
            onChange={(e) => setTitulo(e.target.value)}
          />
        </div>

        <div className="campo">
          <label htmlFor="autor" className="campo__etiqueta">
            Autor
          </label>
          <input
            id="autor"
            type="text"
            className="campo__entrada"
            placeholder="Ej: Julio Cortázar"
            value={autor}
            onChange={(e) => setAutor(e.target.value)}
          />
        </div>

        {errorLocal && (
          <p className="aviso aviso--atencion" role="alert">
            {errorLocal}
          </p>
        )}

        <button
          type="submit"
          className="boton boton--primario boton--bloque"
          disabled={deshabilitado}
        >
          {deshabilitado ? 'Guardando...' : 'Crear libro'}
        </button>
      </form>
    </section>
  );
}
