import { createContext, useContext } from "react";
import UseStorageState from '../servicios/UseStorageState';


// Contexto de la app
const AuthContext = createContext()

export const AuthProvider = ({children}) => {

    const [user, setUser] = UseStorageState("usuario", null)
    
    const login = (userData) => {
        setUser(userData)
        // con localstorage se queda almacenado localmente el usuario
        localStorage.setItem("user", JSON.stringify(userData))
    }

    const logout = () => {
        setUser(null)
        // borramos de localstorage
        localStorage.removeItem("user")
    }

    return (
        <AuthContext.Provider value={{user, login, logout}} >
            {children}
        </AuthContext.Provider>
    )
}

export const useAuth = () => useContext(AuthContext)
