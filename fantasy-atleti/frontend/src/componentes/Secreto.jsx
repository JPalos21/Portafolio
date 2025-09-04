import { useState } from "react";
import '../estilos/Secreto.css';
import { buscarProducto, incrementarDinero, IncrementarMuchasCantidades, reducirDinero } from "../herramientas/buscarJugador";
import Swal from "sweetalert2";


const Secreto = ({ presupuestoInicial, setPresupuestoInicial, presupuesto, setPresupuesto }) => {

    const dinero = [
        {"id": 1, "nombre": "5", "precio": 5, "url": "/imagenes/5millones.png"},
        {"id": 2, "nombre": "10", "precio": 10, "url": "/imagenes/10millones.jpeg"},
        {"id": 3, "nombre": "20", "precio": 20, "url": "/imagenes/20millones.jpeg"}
    ]

    const [totalSumar, setTotalSumar] = useState(0)
    const [billetes, setBilletes] = useState([])

    const AñadirDinero = (nombre, precio) => {

        setTotalSumar(totalSumar + precio)
        let dineroAñadir = buscarProducto(dinero, nombre)

        if (buscarProducto(billetes, nombre) === null) {
            setBilletes([...billetes,
                {id: dineroAñadir.id, nombre: dineroAñadir.nombre, precio: dineroAñadir.precio, cantidad: 1}
            ])
        } else {    
            setBilletes(incrementarDinero(billetes, nombre))
        }
    }

    function reducir(billete) {

        // Aquí actualizamos la lista de productos llamando a la función de reducirCantidad
        setBilletes(reducirDinero(billetes, billete.nombre)) // Aquí ya reduce la cantidad de productos
        // Así que ahora lo que falta es actualizar el total
        setTotalSumar(totalSumar - billete.precio)
    }

    function incrementarMuchos(billete) {
        console.log(billete)
        console.log(billete.nombre)
        // Pedimos la cantidad que queremos sumar
        let cantidad = parseInt(prompt("¿Cuántos productos deseas añadir?"))
        if (isNaN(cantidad) || cantidad <= 0) return; // Evitar valores inválidos
        if (cantidad > 10) {
            alert("No se ha podido sumar");
            return;
        }
        // Llamamos a la funcion de sumar muchos productos y  Actualizamos la lista de productos
        const existe = billetes.some(b => b.nombre === billete.nombre);
        let nuevaCantidad = existe 
        ? billetes.find(b => b.nombre === billete.nombre).cantidad + cantidad 
        : cantidad;
    
    if (nuevaCantidad > 10) {
        alert("No se ha podido sumar, excede el límite de 10");
        return;
    }

    let nuevoImporte = billete.precio * cantidad;
    let nuevoArrayBilletes;

    if (!existe) {
        nuevoArrayBilletes = [...billetes, { ...billete, cantidad }];
    } else {
        nuevoArrayBilletes = IncrementarMuchasCantidades(billetes, billete.nombre, cantidad);
    }

    setBilletes(nuevoArrayBilletes);
    setTotalSumar(prev => prev + nuevoImporte); // Sumar solo si pasa la validación

    console.log("Nuevo importe a sumar:", nuevoImporte);
}

function espaldarazoFinanciero() {
    console.log(totalSumar)
    Swal.fire({
        title: "Espaldarazo financiero activado",
        text: "Al final si tenías palancas como el Barça",
        icon: "success"
    });
    setPresupuestoInicial(presupuestoInicial + totalSumar)
    setPresupuesto(presupuesto + totalSumar)
    setTotalSumar(0)
    setBilletes([])
}


    return (
        <div className="secreto-container">
            <h2 className="secreto-titulo">Gestión de Presupuesto</h2>
            <div className="secreto-presupuesto">
                <p><strong>Presupuesto inicial:</strong> {presupuestoInicial}M €</p>
                <p><strong>Presupuesto actual:</strong> {presupuesto}M €</p>
                <p><strong>Cantidad a sumar:</strong> {totalSumar}M €</p>
                <button onClick={()=> espaldarazoFinanciero()}>Activar espaldarazo financiero</button>
            </div>

            <ul className="secreto-lista">
                {dinero.map((billete, index) => (
                    <li key={index} className="secreto-item">
                        <img src={billete.url} alt={`${billete.nombre} millones`} className="secreto-imagen" />
                        <p className="secreto-texto">
                            Añadir: {billete.precio}M €
                            <button onClick={() => reducir(billete)}>-</button>
                            <button className="secreto-boton" onClick={() => AñadirDinero(billete.nombre, billete.precio)}>Añadir</button>
                            <button onClick={() => incrementarMuchos(billete)}>*</button>
                            
                        </p>
                    </li>
                ))}
            </ul>
            <ul>
                {billetes.map((elemento, index) => (
                    <li key={index}>
                        Dinero: {elemento.nombre}M €
                        Cantidad: {elemento.cantidad}
                    </li>
                ))}
            </ul>
        </div>
    )

}
export default Secreto;