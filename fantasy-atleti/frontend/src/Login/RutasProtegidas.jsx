import { Navigate } from "react-router-dom"
import { useAuth } from "./AuthProvider"


const RutasProtegidas = ({children}) => {

    const {user} = useAuth()
    return user ? children : <Navigate to="/login" />

}

export default RutasProtegidas