import Swal from "sweetalert2";
import servicioJugadores from "../servicios/axios/servicioJugadores";

const BorrarProducto = (item, alineaciones, setAlineaciones) => {

    Swal.fire({
        title: "¿Estás seguro de borrar la afición?",
        text: "No podrás revertir la operación",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#d33",
        cancelButtonColor: "#3085d6",
        confirmButtonText: "Sí, eliminar",
        cancelButtonText: "Cancelar",
    }).then((result) => {
        if (result.isConfirmed) {
            servicioJugadores.deleteAlineacion(item.id)
            .then(() => {
               /* const nuevaInformacion = alineaciones.filter((a) => a.id !== informacion.id);
                setAlineaciones(nuevaInformacion);*/
                Swal.fire(
                "¡Eliminado!",
                "El elemento ha sido eliminado.",
                "success"
                );
                servicioJugadores.getAlineaciones()
                .then(response => {
                    setAlineaciones(response.data)
                })
            })
            .catch((error) => {
                Swal.fire("ERROR, no se ha podido borrar la alineación")
            })
        }
    })
}

export default BorrarProducto;