import { useEffect, useState } from 'react';
import '../estilos/Menu.css';
import { calcularUnidades } from '../herramientas/buscarJugador';
import LocalStorageServicio from '../servicios/storage';
import UseStorageState from '../servicios/UseStorageState';
import { Link } from 'react-router-dom';
import { useAuth } from '../Login/AuthProvider';

const Menu = ({ total, productos, presupuesto, posiciones, setTotal, setProductos, setPresupuesto, setPosiciones }) => {

  const [carritoVisible, setCarritoVisible] = useState(false)
  const {user} = useAuth()

  const mostrarCarrito = () => {
    setCarritoVisible(!carritoVisible)
  }

  let importeTotal = total
  let unidades = calcularUnidades(productos)
  let presupuestoRestante = presupuesto

  function borrarSesion() {
    LocalStorageServicio.clear()
    window.location.reload()
  }

  function borrarPosiciones(posicion) {
    let importeBorrar = 0
    const nuevaLista = productos.filter((producto) => producto.posicion !== posicion.posicion)
    const listaBorrar = productos.filter((producto) => producto.posicion === posicion.posicion)
    listaBorrar.forEach(e => {
      //console.log(e, `precio: ${e.precio} cantidad: ${e.cantidad}`)
      importeBorrar += e.precio
    });
    console.log(importeBorrar)
    setTotal(total - importeBorrar)
    setPresupuesto(presupuesto + importeBorrar)
    const nuevaListaPosiciones = posiciones.filter((posicionamiento) => posicionamiento.posicion !== posicion.posicion) 
    setProductos(nuevaLista)
    setPosiciones(nuevaListaPosiciones)
  }

  return (
    <div className="menu-superior">
      <nav>
        <ul className="menu-lista">
          <li>
            <button onClick={() => borrarSesion()}>Cerrar sesión</button>
          </li>
          {/* Icono del supermercado */}
          <li>
            <Link to="/secreto">
              <img
                src="/imagenes/atleti_logo.png"
                alt="Supermercado"
                className="icono-atleti"
              />
            </Link>
          </li>
          {user === null ? (
            <span/>
          ) : (
            <div className='usuario-opciones'>
              <span className="saludo-usuario">Hola {user}</span>
              {/* Enlaces */}
              <li><Link to="/">Inicio</Link></li>
              <li><Link to="/detalle-carrito" >Mi alineación</Link></li>
              <li><Link to="/alineaciones">Alineaciones</Link></li>
              <span className='presupuesto-restante'>Presupuesto: {presupuestoRestante} M</span>
            </div>
          )}
          

          
          {user !== "admin" ? (
            <span/> ) : (
              <li id='idAdmin' className='admin'><Link to="/admin">Admin</Link></li>
            
          )}

          {/* Información destacada del carrito */}
          <li className="carrito-info">
            <span className="carrito-unidades">
              🛒 Unidades: {unidades}
            </span>
            <span className="carrito-total">
              Total: {importeTotal} M Є
            </span>
          </li>
  
          {/* Botón para mostrar/ocultar carrito */}
          <li>
            <button className="toggle-carrito" onClick={mostrarCarrito}>
              🛒
            </button>
           
          </li>
          {/* Carrito desplegable */}
          {carritoVisible && (
            <li className="carrito-productos">
              <h4>Carrito</h4>
              {productos.length > 0 ? (
                <ul className="lista-productos">
                  {/*productos.map((producto, index) => (
                    <li key={index} className="producto-item">
                      <span>{producto.cantidad} x {producto.nombre}</span>
                      <button
                        className="eliminar-producto"
                      >
                        🗑️
                      </button>
                    </li>
                  ))*/}
                    {posiciones.map((posicion, index) => (
                    // <ul>
                      <li key={index}>
                        <span>{posicion.posicion} x {posicion.cantidad} </span>
                        <button
                          className="eliminar-producto" onClick={() => borrarPosiciones(posicion)}
                        >
                          🗑️
                        </button>
                      </li>
                    //</ul>
                    ))}
                </ul>
              ) : (
                <p>No hay productos en el carrito.</p>
              )}
            </li>
          )}
        </ul>
      </nav>
    </div>
  );
};

export default Menu;
