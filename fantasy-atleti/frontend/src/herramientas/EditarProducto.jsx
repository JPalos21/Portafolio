import React, {useState, useEffect} from 'react';
import '../estilos/FormularioAficiones.css'
import Swal from 'sweetalert2';
import servicioJugadores from '../servicios/axios/servicioJugadores';

function EditarProducto({item, setJugadores, onClose}) {

    // Almacenamos los errores del usuario
    const [errores, setErrores] = useState({})

    // Almacenamos los datos del formulario
    const [form, setForm] = useState({
        nombre: item.nombre,
        posicion: item.posicion,
        precio: item.precio,
        url: item.url,
        descripcion: item.descripcion
    });


    // Función para gestionar los cambios en los campos del formulario
    const gestionarCambio = (e) => {

        const {name, value} = e.target;

        setForm({
            ...form,
            [name] : value,
        })
    }


    // Función de validación
    const validar = () => {
        const nuevosErrores = {}

        // Validacion para "nombre"
        if (!form.nombre.trim()){
            nuevosErrores.nombre = "El nombre es obligatorio"
        }

        // Validación para "descripcion"
        if (isNaN(form.precio)) {
            nuevosErrores.precio = "El precio debe ser un número";
        } else if (Number(form.precio) <= 0) {
            nuevosErrores.precio = "El precio debe ser mayor a 0";
        }

        setErrores(nuevosErrores)

        // Retorna true si no hay errores y false si los hay
        return Object.keys(nuevosErrores).length === 0
    }

    // Función para manejar el envío del formulario
    const enviarFormulario = (e) => {
        e.preventDefault()

        if (validar()) {
            console.clear()
            console.log("Formulario enviado", form)

            const editarProducto = {
                nombre: form.nombre,
                posicion: form.posicion,
                precio: Number(form.precio),
                url: form.url,
                descripcion: form.descripcion
            }

            // Enviar por Axios al Json de BD
            servicioJugadores.update(item.id, editarProducto)
            .then(response => {
                Swal.fire("Jugador Actualizado correctamente"); 
                window.location.reload()

                servicioJugadores.getAll()
                .then(response => {
                    setJugadores(response.data)
                })

                onClose(); // Cerramos el modal
            })
            .catch((error) => {
                Swal.fire("ERROR al editar el jugador")
            })
        }
    }

     

    return (
        <form className="editar-producto-form" onSubmit={enviarFormulario}>
        <label className="editar-producto-label" htmlFor="nombre">Nombre del producto a Editar</label>
        <input
          id='nombre'
          type='text'
          name='nombre'
          className='editar-producto-input'
          value={form.nombre}
          onChange={gestionarCambio}
          placeholder='Escribe el nombre del producto'
        />
        {errores.nombre && <p className='editar-producto-error'>{errores.nombre}</p>}
  
        <label className="editar-producto-label" htmlFor="precio">Precio del Producto</label>
        <input
          id='precio'
          type='number'
          name='precio'
          className='editar-producto-input'
          value={form.precio}
          onChange={gestionarCambio}
          placeholder='Escribe el precio del producto'
        />
        {errores.precio && <p className='editar-producto-error'>{errores.precio}</p>}
        
        <label className="editar-producto-label" htmlFor="url">Imagen del Producto</label>
        <input
          id='url'
          type='text'
          name='url'
          className='editar-producto-input'
          value={form.url}
          onChange={gestionarCambio}
          placeholder='Escribe el url del producto'
        />

        <label className="editar-producto-label" htmlFor="posicion">Imagen del Producto</label>
        <input
          id='posicion'
          type='text'
          name='posicion'
          className='editar-producto-input'
          value={form.posicion}
          onChange={gestionarCambio}
          placeholder='Escribe la posicion del producto'
        />

        <label className="editar-producto-label" htmlFor="descripcion">Imagen del Producto</label>
        <input
          id='descripcion'
          type='text'
          name='descripcion'
          className='editar-producto-input'
          value={form.descripcion}
          onChange={gestionarCambio}
          placeholder='Escribe la descripcion del producto'
        />

        <button className='editar-producto-boton' type='submit'>Enviar</button>
        </form>
    )
}

export default EditarProducto;
