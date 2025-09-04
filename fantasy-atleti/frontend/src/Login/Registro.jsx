import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import bcrypt from "bcryptjs";
import servicioJugadores from "../servicios/axios/servicioJugadores";
import Swal from "sweetalert2";
import '../estilos/LoginRegistro.css'


const Registro = () => {

    const [usuario, setUsuario] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();

        // Ciframos la contraseña antes de enviarla
        const salt = bcrypt.genSaltSync(10);
        const hash = bcrypt.hashSync(password, salt);

        const nuevoUsuario = {
            nombre: usuario,
            pass: hash, // Guardamos la contraseña cifrada
        };

        servicioJugadores.register(nuevoUsuario)
            .then(() => {
                Swal.fire("Éxito", "Usuario registrado de éxito", "success");
                navigate("/login");
            })
            .catch((error) => {
                Swal.fire("Error", "No se pudo registrar el usuario", "error");
                console.error(error);
            });
    };

    return (
        <div className="auth-container">
            <h2>Registro</h2>
            <form onSubmit={handleSubmit} className="auth-form">
                <div>
                    <label>Usuario:</label>
                    <input
                        type="text"
                        value={usuario}
                        onChange={(e) => setUsuario(e.target.value)}
                        required
                    />
                </div>
                <div>
                    <label>Password:</label>
                    <input
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                    />
                </div>
                {error && <p className="auth-error">{error}</p>}
                <button type="submit" className="auth-button">Registrarse</button>
            </form>
            <p className="auth-link">
                ¿Ya tienes cuenta? <Link to="/">Inicia sesión</Link>
            </p>
        </div>
    );
}

export default Registro