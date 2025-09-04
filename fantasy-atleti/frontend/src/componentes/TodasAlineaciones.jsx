import { useEffect, useState } from "react";
import servicioJugadores from "../servicios/axios/servicioJugadores";
import Modal from "./Modal";
import '../estilos/TodasAlineaciones.css';
import BorrarProducto from "../herramientas/borrarProducto";

const TodasAlineaciones = () => {

    const [alineaciones, setAlineaciones] = useState([])
    const [alineacionSeleccionada, setAlineacionSeleccionada] = useState(null)

    // Manejo de modales
  const [modals, setModals] = useState({
    consultar: false,
  })

  // Gestión del modal
  const gestionarModal = (tipoModal, modalAbierto) => {
    setModals((modalSeleccionado) => ({...modalSeleccionado, [tipoModal]: modalAbierto}))
  }

    useEffect(() => {
        servicioJugadores.getAlineaciones()
        .then((response) => {
            setAlineaciones(response.data)
        })
        .catch((error) => {
            Swal.fire({
            title: "Parece que hay un problema",
            text: "No se pueden cargar las alineaciones",
            icon: "error"
            });
        });
    }, []);

    // Constantes de funcionalidades de los modales
  const consultarAlineacion = (alineacion) => {
    setAlineacionSeleccionada(alineacion)
    gestionarModal("consultar", true)
  }

  const borrarAlineacion = (alineacion) => {
    BorrarProducto(alineacion, alineaciones, setAlineaciones)
  } 

  return (
    <>
      <ul className="alineaciones-lista">
        {alineaciones.map((alineacion, index) => (
          <li key={index} className="alineacion-item">
            <div className="alineacion-info">
              <span>{alineacion.entrenador} - "{alineacion.apodo}"</span>
            </div>
            <div className="alineacion-acciones">
              <button className="consultar" onClick={() => consultarAlineacion(alineacion)}>
                Consultar
              </button>
              <button className="borrar" onClick={() => borrarAlineacion(alineacion)}>
                Borrar
              </button>
            </div>
          </li>
        ))}
        
        <Modal isOpen={modals.consultar} onClose={() => gestionarModal("consultar", false)}>
          {alineacionSeleccionada && (
            <div className="modal-contenido">
              <h2>
                <span className="modal-entrenador">{alineacionSeleccionada.entrenador}</span> | 
                <span className="modal-apodo"> "{alineacionSeleccionada.apodo}"</span>
              </h2>
              <p className="modal-precio">
                <strong>Valoración total:</strong> {alineacionSeleccionada.precio}M €
              </p>
              <div className="modal-jugadores">
                {alineacionSeleccionada.alineacion.map((jugador, index) => (
                  <span key={index} className="modal-jugador">
                    {jugador}
                  </span>
                ))}
              </div>
            </div>
          )}
        </Modal>
      </ul>
    </>
  )

}
export default TodasAlineaciones;