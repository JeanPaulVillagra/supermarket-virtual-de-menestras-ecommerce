// Inicio del archivo NavBar.js
import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './NavBar.css'; // Archivo CSS para estilos personalizados

const NavBar = ({ isLoggedIn, handleLogout }) => {
  const navigate = useNavigate();
  const role = localStorage.getItem('role'); // Obtener el rol del usuario desde LocalStorage

  const handleAdminLogout = () => {
    localStorage.clear(); // Limpia el almacenamiento local
    handleLogout(); // Ejecuta la lógica de cierre de sesión
    navigate('/'); // Redirige al inicio
  };

   // Logs para depuración
   console.log('Renderizando NavBar');
   console.log('isLoggedIn:', isLoggedIn);
   console.log('role:', role);
  

  return (
    <nav className="navbar">
      <div className="navbar-logo">
        <Link to="/">
          <img 
            src={`${process.env.REACT_APP_API_URL}/images/logo-menestra-nova.jpg`} 
            alt="Menestra Nova Logo" 
            className="navbar-logo-image" 
          />
        </Link>
      </div>
      <ul className="navbar-links">
        <li><Link to="/">Inicio</Link></li>
        <li><Link to="/products">Productos</Link></li>
        {isLoggedIn ? (
          <>
            {role === 'admin' ? (
              <>
                <li><Link to="/admin/products">Admin Productos</Link></li>
                <li>
                  <button onClick={handleAdminLogout} className="logout-button">
                    Cerrar sesión (Admin)
                  </button>
                </li>
              </>
            ) : (
              <>
                <li><Link to="/dashboard">Dashboard</Link></li>
                <li>
                  <button onClick={handleLogout} className="logout-button">
                    Cerrar sesión
                  </button>
                </li>
              </>
            )}
          </>
        ) : (
          <>
            <li><Link to="/register">Registro</Link></li>
            <li><Link to="/login">Login</Link></li>
          </>
        )}
      </ul>
    </nav>
  );
};

export default NavBar;

// Final del archivo NavBar.js