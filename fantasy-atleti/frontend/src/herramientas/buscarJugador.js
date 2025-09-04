export function buscarJugador(conjunto, nombre, posicion) {
    return conjunto.find(item => item.nombre.toLowerCase() === nombre.toLowerCase()) || null
}

export function incrementarCantidad(informacion , nombre) {  
  
    return informacion.map(producto => {
      if (producto.nombre.toLowerCase() === nombre.toLowerCase()) {
        return { ...producto, cantidad: producto.cantidad + 1 }; 
      }
      return { ...producto }; 
    });
}

// Función para calcular las unidades en el menú
export function calcularUnidades(productos) {

    let unidades = 0;
    productos.forEach(producto => {
        unidades += producto.cantidad
    });
    return unidades;
}

export function buscarProducto(informacion, nombre) {
  return informacion.find(producto => producto.nombre === nombre) || null;
}

export function incrementarDinero(conjunto, nombre) {

  return conjunto.map((elemento) => {
    if (elemento.nombre === nombre) {
      return { ...elemento, cantidad: elemento.cantidad + 1 }; 
    }
    return {...elemento}
  })
}

export function reducirDinero(conjunto, nombre) {  

  return conjunto.map((producto) => {
    if (producto.nombre.toLowerCase() === nombre.toLowerCase()) {
      return {...producto, cantidad: producto.cantidad -1 }
    }
    return {...producto}
  })
}

export function IncrementarMuchasCantidades(conjunto, nombre, cantidad) {

  return conjunto.map((producto) => {
    if (producto.nombre === nombre) {
      const nuevaCantidad = producto.cantidad + cantidad;
      if (nuevaCantidad <= 10) {
        return {...producto, cantidad: nuevaCantidad}
      }
      else {
        alert("No se ha podido sumar")
        return producto
      }
    }
    return {...producto}
  })
}