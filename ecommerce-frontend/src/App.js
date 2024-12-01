// Inicio del archivo App.js
import React, { useState } from 'react';
import { Route, Routes, useNavigate } from 'react-router-dom';
import NavBar from './components/NavBar';
import LandingPage from './components/LandingPage';
import ProductList from './components/ProductList';
import Register from './components/Register';
import Login from './components/Login';
import LoginAdmin from './components/LoginAdmin'; // Importa LoginAdmin
import Dashboard from './components/Dashboard'; // Importa el componente Dashboard
import ProductAdmin from './components/ProductAdmin';
import AdminRoute from './components/AdminRoute'; // Ruta protegida para admin



function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const navigate = useNavigate(); // Hook para redirecció
  
  const handleLogin = () => {
    setIsLoggedIn(true);
    // Puedes guardar el estado en localStorage también, si lo deseas
    localStorage.setItem('isLoggedIn', true);
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    localStorage.clear(); // Borra los datos almacenados al cerrar sesión
    navigate('/'); // Redirige al usuario a Inicio
  };

  return (
      <div className="App">
        <NavBar isLoggedIn={isLoggedIn} handleLogout={handleLogout} />
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/products" element={<ProductList />} />
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login onLogin={handleLogin} />} />
          <Route path="/dashboard" element={<Dashboard />} /> {/* Ruta al Dashboard */}
          <Route
          path="/login-admin"
          element={<LoginAdmin onLogin={handleLogin} />} // Pasa onLogin como prop
        />
          {/* Ruta protegida para ProductAdmin */}
          <Route
            path="/admin/products"
            element={
              <AdminRoute>
                <ProductAdmin />
              </AdminRoute>
            }
          />
        </Routes>
      </div>
  );
}

export default App;

// Final del archivo App.js