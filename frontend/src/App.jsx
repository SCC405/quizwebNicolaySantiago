import { useEffect, useState } from 'react';
import FormularioLibro from './components/FormularioLibro.jsx';
import ListaLibros from './components/ListaLibros.jsx';
import { obtenerLibros, crearLibro, eliminarLibro } from './api.js';

export default function App() {
  const [libros, setLibros] = useState([]);
  const [cargando, setCargando] = useState(true);
  const [guardando, setGuardando] = useState(false);
  const [idEliminando, setIdEliminando] = useState(null);
  const [error, setError] = useState('');

  useEffect(() => {
    cargarLibros();
  }, []);

  async function cargarLibros() {
    setCargando(true);
    try {
      setLibros(await obtenerLibros());
      setError('');
    } catch (e) {
      setError(e.message);
    } finally {
      setCargando(false);
    }
  }

  async function manejarCrear(nuevoLibro) {
    setGuardando(true);
    try {
      const libro = await crearLibro(nuevoLibro);
      setLibros((actuales) => [...actuales, libro]);
      setError('');
      return true;
    } catch (e) {
      setError(e.message);
      return false;
    } finally {
      setGuardando(false);
    }
  }

  async function manejarEliminar(id) {
    setIdEliminando(id);
    try {
      await eliminarLibro(id);
      setLibros((actuales) => actuales.filter((libro) => libro.id !== id));
      setError('');
    } catch (e) {
      setError(e.message);
    } finally {
      setIdEliminando(null);
    }
  }

  return (
    <div className="contenedor">
      <header className="encabezado">
        <h1 className="encabezado__titulo">Biblioteca</h1>
        <p className="encabezado__descripcion">
          Listado de libros consumido desde la API REST en <code>/api/libros</code>.
        </p>
      </header>

      {error && (
        <div className="aviso aviso--error" role="alert">
          <span>{error}</span>
          <button
            type="button"
            className="boton boton--peligro boton--pequeno"
            onClick={cargarLibros}
          >
            Reintentar
          </button>
        </div>
      )}

      <div className="diseno">
        <FormularioLibro onCrear={manejarCrear} deshabilitado={guardando} />

        <section className="listado">
          <div className="listado__cabecera">
            <h2 className="listado__titulo">Libros ({libros.length})</h2>
            <button
              type="button"
              className="boton boton--neutro boton--pequeno"
              onClick={cargarLibros}
              disabled={cargando}
            >
              Actualizar
            </button>
          </div>

          {cargando ? (
            <div className="cargando">
              <div className="cargando__circulo" role="status">
                <span className="solo-lectores">Cargando</span>
              </div>
            </div>
          ) : (
            <ListaLibros
              libros={libros}
              onEliminar={manejarEliminar}
              idEliminando={idEliminando}
            />
          )}
        </section>
      </div>
    </div>
  );
}
