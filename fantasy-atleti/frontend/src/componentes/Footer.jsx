import React from 'react';
import '../estilos/Footer.css'; // Crearemos este archivo después
import { FaFacebook, FaTwitter, FaInstagram, FaTiktok } from 'react-icons/fa';

const Footer = () => {
  return (
    <footer className="main-footer">
      <div className="footer-content">
        <div className="footer-section">
          <h4>Sobre Nosotros</h4>
          <p>Tu tienda de futbolistas favorita</p>
        </div>
        
        <div className="footer-section">
          <h4>Contacto</h4>
          <ul>
            <li>Email: info@tiendaatleti.com</li>
            <li>Teléfono: +34 123 456 789</li>
          </ul>
        </div>
        
        <div className="footer-section">
          <h4>Redes Sociales</h4>
          <div className="social-icons">
            <a href="#"><FaFacebook /></a>
            <a href="#"><FaTwitter /></a>
            <a href="#"><FaInstagram /></a>
            <a href=""><FaTiktok /></a>
          </div>
        </div>
      </div>
      
      <div className="footer-bottom">
        <p>&copy; {new Date().getFullYear()} Tienda de Futbolistas. Todos los derechos reservados</p>
      </div>
    </footer>
  );
};

export default Footer;