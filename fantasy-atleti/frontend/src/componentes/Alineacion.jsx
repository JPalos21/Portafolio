import { Link, useNavigate } from 'react-router-dom';
import '../estilos/Alineacion.css';
import { incrementarCantidad } from '../herramientas/buscarJugador';
import { useAuth } from '../Login/AuthProvider';
import { useState } from 'react';
import Swal from 'sweetalert2';
import servicioJugadores from '../servicios/axios/servicioJugadores';



const Alineacion = ({ productos, setProductos , total, setTotal, posiciones, setPosiciones, presupuesto, setPresupuesto}) => {

  const [errores, setErrores] = useState({})
  const navigate = useNavigate();

  function borrar(producto) {
    // Borramos de productos y actualizamos total y presupuesto
    const nuevaLista = productos.filter((item) => item.nombre !== producto.nombre)
    setTotal (total - producto.precio)
    setPresupuesto(presupuesto + producto.precio)
    setProductos(nuevaLista)

    const nuevaListaPosiciones = posiciones.map((item)=> {
      if (item.posicion === producto.posicion) { // pillamos la posición a restar
        return {...item, cantidad: item.cantidad - 1} // le restamos 1
      }
      return item;
    }).filter((item) => item.cantidad > 0) // en caso de que haya posiciones con cantidad 0, no los pillamos
    
    setPosiciones(nuevaListaPosiciones)
    
  }

  const {user} = useAuth()
  // const jugadoresEnviar = []
  // productos.forEach(e => {
  //   jugadoresEnviar.push(e.nombre)
    
  // });
  const jugadoresEnviar = productos
  .sort((a, b) => a.id - b.id) // Ordena por ID ascendente
  .map(e => e.nombre);



  // Estado del formulario
  const [form, setForm] = useState({
    entrenador: user,
    apodo: '',
  });
  
  // Funcion para gestionar los cambios del formulario
  const gestionarCambio = (e) => {
    const {name, value} = e.target

    setForm({
      ...form,
      [name]: value,
    })
    console.log(productos)
    console.log(jugadoresEnviar)
  }

  function validar() {
    const nuevosErrores = {}

    // Validamos que no se envíe vacío
    if (form.apodo.trim() === "" || form.apodo.trim() === null) {
      nuevosErrores.apodo = "Tienes que escribir un apodo"
    }
    if (productos.length !== 11) {
      nuevosErrores.alineacion = "Tienes que tener 11 jugadores en la alineación"
    }

    setErrores(nuevosErrores)
    return Object.keys(nuevosErrores).length === 0
    
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    
    if (validar()) {
      console.log("Todo bien")
      const nuevaAlineacion = {
        entrenador: form.entrenador,
        apodo: form.apodo,
        alineacion: jugadoresEnviar,
        precio: total
      }

      servicioJugadores.crearAlineacion(nuevaAlineacion)
      .then(() => {
        Swal.fire("Éxito", "Alineación nueva registrada de éxito", "success");
        navigate("/");
      })
      .catch((error) => {
          Swal.fire("Error", "No se pudo enviar la alineación", "error");
          console.error(error);
      });
    }
    return;
  } 

  return (
    <div className="container-detalle">
      <h2>Productos Seleccionados</h2>
      <ul>
        {productos.map((producto, index) => {
          return (
            <li key={index} className="producto-item">
              <div className="producto-detalle">
                {/* Contenedor de imagen con clase adicional */}
                <div className="producto-imagen">
                  <Link to={`/producto/${producto.id}`}>
                    <img src={producto.url} alt={producto.nombre} />
                  </Link>
                </div>
                
                {/* Contenedor de información */}
                <div className="producto-info">
                  <span>{producto.cantidad} x {producto.nombre}</span>
                  <span>Precio: {producto.precio}M Є</span>
                  <span>Posición: {producto.posicion}</span>
                </div>

                {/* Botones de acciones */}
                <div className="producto-acciones">
                  <button
                    className="btn-borrar"
                    onClick={() => borrar(producto)}
                  >
                    Borrar
                  </button>
                </div>
              </div>
            </li>
          );
        })}
        <li className="total">Número de Elementos: {productos.length}</li>
      </ul>
      
      <form onSubmit={handleSubmit} className='formulario-alineacion'>
        <div className='form-group'>
          <label >Nombre del Entrenador: </label>
          <input type="text" value={user} disabled name='entrenado' className='campo-deshabilitado' />
        </div>

        {/* Campo de apodo editable */}
        <div className='form-group'>
          <label htmlFor="apodo">Apodo de la alineación: </label>
          <input type="text" name="apodo" id='apodo' value={form.apodo} onChange={gestionarCambio} />
          {errores.apodo && <p className="error">{errores.apodo}</p>}
        </div>
        {errores.alineacion && <p className="error">{errores.alineacion}</p>}
        <button type='submit'>Enviar</button>
      </form>
    </div>
  );
};

export default Alineacion;
