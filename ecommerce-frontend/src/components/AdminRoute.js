// Inicio del archivo AdminRoute.js
import React from 'react';
import { Navigate } from 'react-router-dom';

const AdminRoute = ({ children }) => {
  const role = localStorage.getItem('role'); // Obtener el rol del usuario desde localStorage

  if (role !== 'admin') {
    alert('Acceso denegado: Debes ser administrador.');
    return <Navigate to="/" replace />; // Redirige al inicio si no es admin
  }

  return children; // Renderiza el componente si el rol es admin
};

export default AdminRoute;


// Inicio del archivo AdminRoute.js
