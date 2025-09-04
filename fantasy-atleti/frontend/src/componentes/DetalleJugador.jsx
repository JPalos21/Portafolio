import '../estilos/DetalleJugador.css';
import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom';
import servicioJugadores from '../servicios/axios/servicioJugadores';

const DetalleJugador = ({jugadores}) => {  

  const {id} = useParams()


  const [producto,setProducto] = useState([])

  useEffect(() => {
  servicioJugadores.get(id)
      .then((response) => {
        setProducto(response.data);
      })
      .catch((error) => {
        
       alert("No se ha podido consultar el producto")
      });
    }, []);

  return (
    <div className="container-detalle-producto">
      {producto !== null ? (
        <div className="detalle-info">
          <h1 className="producto-nombre">{producto.nombre}</h1>
          <p className="producto-precio">{producto.precio}M Є</p>
          <img
            className="detalle-imagen"
            src={producto.url}
            alt={producto.nombre}
          />
          <p> {producto.descripcion} </p>
        </div>  
      ) : (
        <h1 className="error-mensaje">No existe el producto indicado</h1>
      )}
    </div>
  );
  
};

export default DetalleJugador ;
