import { Navigate } from "react-router-dom";
import { useAuth } from "./AuthProvider";
import { useEffect } from "react";

const RutasProtegidasAdmin = ({ children, setErrorAdmin }) => {
  const { user } = useAuth();
  
  useEffect(() => {
    if (user !== "admin") {
      setErrorAdmin("No tienes permitido acceder a este sitio, no eres Administrador")
    }
  },[user, setErrorAdmin])
  
  return user && user === "admin" ? children : <Navigate to="/" />;
};

export default RutasProtegidasAdmin;
