import { useState } from "react"
import servicioJugadores from "../servicios/axios/servicioJugadores"
import { Link, useNavigate } from "react-router-dom"
import { useAuth } from "./AuthProvider"
import bcrypt from 'bcryptjs';
import '../estilos/LoginRegistro.css'


const Login = () => {

    const [usuario, setUsuario] = useState('')
    const [password, setPassword] = useState('')
    const [error, setError] = useState('')
    const {login} = useAuth()
    const navigate = useNavigate()

    // Ciframos la contraseña 
    const cifrarPassword = () => {
        // Generamos salt
        const salt = bcrypt.genSaltSync(10)
        // Hasheamos la contraseña
        const hash = bcrypt.hashSync(password, salt)

        console.log(`salt:${salt}`)
        console.log(`mensaje cifrado:${hash}`)

        return hash;
    }

    const handleSubmit = async (e) => {
        
        e.preventDefault()
        //console.log( cifrarPassword())

        servicioJugadores.login(usuario)
        .then((response) => {
            if(response.data.length !== 0) {
                const usuario = response.data[0]
                const hashUsuario = usuario.pass

                const esCorrecta = bcrypt.compareSync(password, hashUsuario)

                if (esCorrecta) {
                    login(usuario.nombre)
                    navigate('/')
                } else {
                    setError("Contraseña incorrecta")
                }
            } else {
                setError("Usuario no es correcto")
            }
        })
        .catch((error) => {
            alert(error)
            navigate('/login')
        })
    }

    return (
        <div className="auth-container">
            <h2>Login</h2>
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
                <button type="submit" className="auth-button">Login</button>
            </form>
            <p className="auth-link">
                ¿No tienes cuenta? <Link to="/registro">Regístrate aquí</Link>
            </p>
        </div>
    )
}

export default Login