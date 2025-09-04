import { useState } from 'react';
import '../estilos/Admin.css';
import servicioJugadores from '../servicios/axios/servicioJugadores';
import Swal from 'sweetalert2';
import Modal from '../componentes/Modal';
import EditarProducto from '../herramientas/EditarProducto';

const Admin = ({}) => {

  // Almacenamos los erroes de formulario
  const [errores, setErrores] = useState({})
  const [jugadores, setJugadores] = useState([])
  const [jugadorSeleccionado, setJugadorSeleccionado] = useState(null)


  // Manejo de modales
  const [modals, setModals] = useState({
    consultar: false,
    editar: false,
  })

  // Gestión del modal
  const gestionarModal = (tipoModal, modalAbierto) => {
    setModals((modalSeleccionado) => ({...modalSeleccionado, [tipoModal]: modalAbierto}))
  }


  // Almacenamos los valores del formulario
  const [form, setForm] = useState({
    posicion: '',
  })

  // Funcion para gestionar los cambios del formulario
  const gestionarCambio = (e) => {
    const {name, value} = e.target

    setForm({
      ...form,
      [name]: value,
    })
  }

  // Función de validación
  const validar = () => {
    const nuevosErrores = {}

    // Validamos que no se envíe vacío
    if (form.posicion.trim() === "" || form.posicion.trim() === null) {
      nuevosErrores.posicion = "Tienes que seleccionar una posición"
    }

    setErrores(nuevosErrores)
    return Object.keys(nuevosErrores).length === 0
  }

  // Función para manejar el envío del formulario
  const enviarFormulario = (e) => {
    e.preventDefault()

    if (validar()) {
      // Si el campo es todos, me lista todos los jugadores
      if (form.posicion.trim() === "Todos") {
        servicioJugadores.getAll()
        .then((response) => {
          setJugadores(response.data)
        })
        .catch((error) => {
          Swal.fire({
            title: "Parece que hay un problema",
            text: "No se pueden cargar los jugadores loko",
            icon: "error"
          });
        })
      }

      // Si el campo rellenado es alguna posición, buscar por posición
      else if (form.posicion.trim() === "Portero" || form.posicion.trim() === "Defensa" || 
       form.posicion.trim() === "Centrocampista" || form.posicion.trim() === "Delantero" ) {
        servicioJugadores.getPorPosicion(form.posicion)
        .then((response) => {
          setJugadores(response.data)
        })
        .catch((error) => {
          Swal.fire({
            title: "Parece que hay un problema",
            text: "No encuentro esta posición",
            icon: "error"
          });
        })
      }
      // Si no se llenó ningún campo mostrar mensaje
      else {
        Swal.fire({
          title: "No rellenó ningún campo",
          text: "Por favor, corrija los errores para enviar",
          icon: "warning"
        });
      }
    } else {
      Swal.fire({
        title: "Elige una posición",
        text: "Por favor, corrija los errores para enviar",
        icon: "warning"
      });
    }
  }

  // Constantes de funcionalidades de los modales
  const consultarJugador = (jugador) => {
    setJugadorSeleccionado(jugador)
    gestionarModal("consultar", true)
  }

  const editarJugador = (jugador) => {
    setJugadorSeleccionado(jugador)
    gestionarModal("editar", true)
  }


  return (
    <div className="admin-container">
      <h2>Panel de Administración</h2>
      <p>Aquí puedes gestionar jugadores, añadir o eliminar usuarios, etc.</p>

      <div className="filters">
        <form onSubmit={enviarFormulario}>
          <label htmlFor="posicion">Posición</label>
          <select name="posicion" id="posicion" value={form.posicion} onChange={gestionarCambio}>
            <option value="">Selecciona una posición</option>
            <option value="Todos">Todos</option>
            <option value="Portero">Portero</option>
            <option value="Defensa">Defensa</option>
            <option value="Centrocampista">Centrocampista</option>
            <option value="Delantero">Delantero</option>
          </select>

          {errores.posicion && <p className="error">{errores.posicion}</p>}

          <button type="submit">Buscar</button>
          <button type="button">Limpiar</button>
        </form>
      </div>

      <ul className="jugadores-lista">
        {jugadores.map((jugador, index) => (
          <li key={index} className="jugador-item">
            <img src={jugador.url} alt={jugador.nombre} className="jugador-img" />
            <span className="jugador-info">{jugador.nombre} - {jugador.precio}M Є</span>
            <div className="jugador-acciones">
              <button className="modificar" onClick={() => editarJugador(jugador)}>Modificar</button>
              <button className="consultar" onClick={() => consultarJugador(jugador)} >Consultar</button>
            </div>
          </li>
        ))}
      </ul>
        {/* Modal para editar */}
        <Modal isOpen={modals.editar} onClose={() => {gestionarModal("editar", false)}} >
          <EditarProducto item={jugadorSeleccionado} setJugadores={setJugadores} 
            onClose={() => gestionarModal("editar", false)} >
          </EditarProducto>
        </Modal>

        {/* Modal para consultar */}
        <Modal isOpen={modals.consultar} onClose={() => gestionarModal("consultar", false)} >
          {jugadorSeleccionado && (
            <div>
              <h2>{jugadorSeleccionado.nombre}</h2>
              <img src={jugadorSeleccionado.url} alt="" />
              <p><strong>Precio: </strong> {jugadorSeleccionado.precio}M € </p>
              <p> {jugadorSeleccionado.descripcion} </p>
            </div>
          )}
        </Modal>

    </div>

  );
};

export default Admin;