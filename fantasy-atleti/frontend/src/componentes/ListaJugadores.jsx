import { useEffect, useState } from 'react';
import ServicioJugadores from '../servicios/axios/servicioJugadores'
import Swal from 'sweetalert2';
import '../estilos/ListaJugadores.css'
import { buscarJugador } from '../herramientas/buscarJugador';


// Componente de lista
const ListaJugadores = ({jugadores, total, setTotal, productos, setProductos, presupuesto, setPresupuesto,
   posiciones, setPosiciones, errorAdmin, setErrorAdmin, presupuestoInicial }) => {

  const AnadirProducto = (nombre, precio, posicionamiento) => {
    console.log(productos)
    console.log(posiciones)

    // Buscamos si existe el jugador por el nombre
    let jugadorAnadir = buscarJugador(jugadores, nombre)

    // Buscamos si ya hay algún jugador con la misma posición
    let posicionExistente = posiciones.find((pos) => pos.posicion === posicionamiento)
    console.log(`posicionExis: ${posicionExistente}`)
    if (productos.length === 11) {
      Swal.fire({
        title: "Cuidado crack",
        text: "Solo puedes añadir 11 jugadores",
        icon: "warning"
      })
    } else {
      if (buscarJugador(productos, nombre) === null) {
        if (posicionExistente) {
          if (posicionExistente.posicion === "Portero") {
            Swal.fire({
              title: "Cuidado máquina",
              text: "En el campo se suele jugar solo con 1 portero...",
              icon: "warning"
            });
            return {...posicionExistente}
          } else  if (posicionExistente.posicion === "Defensa") {
            if (posicionExistente.cantidad === 4) {
              Swal.fire({
                title: "Al loro",
                text: "No puedes más de 4 defensas",
                icon: "warning"
              });
              return {...posicionExistente}
            }
          } else  if (posicionExistente.posicion === "Centrocampista" || posicionExistente.posicion === "Delantero") {
            if (posicionExistente.cantidad === 3) {
              Swal.fire({
                title: "Al loro",
                text: "No puedes más de 3 centrocampistas/delanteros mi niñx",
                icon: "warning"
              });
              return {...posicionExistente}
            }
          } 
          if ((total + precio) > presupuestoInicial) {
            Swal.fire({
              title: "No tienes suficiente dinero",
              text: "Ojo que aquí no tienes palancas como el Barça",
              icon: "error"
            });
            return [...posiciones] // Si no me suma una posición aunque no se añade a productos
          } else {
            setTotal(total + precio)
            setPresupuesto(presupuesto - precio)
            setProductos([...productos,
              {id: jugadorAnadir.id, nombre: jugadorAnadir.nombre, posicion: jugadorAnadir.posicion, precio: jugadorAnadir.precio, url: jugadorAnadir.url, cantidad:1 },
            ])
          }
          console.log(`existe`, posicionExistente.posicion)
          // posicionExistente.cantidad +=1
          const nuevaListaPosiciones = posiciones.map((p) => {
            if (p.posicion === posicionExistente.posicion) {
              return {...p, cantidad: p.cantidad + 1}
            }
            return {...p}
          })
          setPosiciones(nuevaListaPosiciones)
          console.log(posiciones)
  
        } else {
          if ((total + precio) > presupuestoInicial) {
            Swal.fire({
              title: "No tienes suficiente dinero",
              text: "Ojo que aquí no tienes palancas como el Barça",
              icon: "error"
            });
            return [...posiciones] // Si no se suma una posición aunque no se añade a productos
          } else {
            setTotal(total + precio)
            setPresupuesto(presupuesto - precio)
            setProductos([...productos,
              {id: jugadorAnadir.id, nombre: jugadorAnadir.nombre, posicion: jugadorAnadir.posicion, precio: jugadorAnadir.precio, url: jugadorAnadir.url, cantidad:1 },
            ])
            setPosiciones([...posiciones, 
              {posicion: posicionamiento, cantidad: 1}
            ],
            console.log("Estado antes de guardar:", posiciones),
            localStorage.setItem("posiciones", JSON.stringify(posiciones)),
            console.log("Estado guardado:", JSON.parse(localStorage.getItem("posiciones"))))
          }
          
        }
      } else {
        Swal.fire({
          title: "Epaaa",
          text: "No puedes añadir el mismo jugador 2 veces, aún no han inventado la forma de clonar personas",
          icon: "warning"
        });
      }
    }
    setErrorAdmin("");
    console.log(posiciones)

  }
  

  return (

  <div className="lista-jugadores">
    <p className='error-admin'>{errorAdmin}</p>
    <h4>Lista de jugadores</h4>
    <div className="jugadores-grid">
      {jugadores.map((jugador) => (
        <div key={jugador.id} className="jugador-card">
          <img src={jugador.url} alt={jugador.nombre} />
          <h5>{jugador.nombre}</h5>
          <p>{jugador.posicion}</p>
          <p>💰 {jugador.precio} M</p>
          <button onClick={() => AnadirProducto(jugador.nombre, jugador.precio, jugador.posicion)}>
            Fichar
          </button>
        </div>
      ))}
    </div>
  </div>
  );
};

export default ListaJugadores;
