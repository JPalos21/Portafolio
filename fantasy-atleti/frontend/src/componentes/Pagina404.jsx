import { Link } from "react-router-dom";
import "../estilos/Pagina404.css"; 

const Pagina404 = () => {
  return (
    <div className="pagina404-container">
      <h1 className="pagina404-title">404</h1>
      <p className="pagina404-text">Página no encontrada</p>
      <Link to="/" className="pagina404-button">Volver al Inicio</Link>
    </div>
  );
};

export default Pagina404;
