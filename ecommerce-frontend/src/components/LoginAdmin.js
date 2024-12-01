// Inicio del archivo LoginAdmin.js
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const LoginAdmin = ({ onLogin }) => {
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();
    setIsLoading(true);

    fetch(`${process.env.REACT_APP_API_URL}/users/login-admin`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ password }),
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error('Error al iniciar sesión como admin');
        }
        return response.json();
      })
      .then((data) => {
        console.log('Datos de inicio de sesión recibidos:', data); // Depuración
        setIsLoading(false);
        if (data.success) {
          alert('Inicio de sesión como admin exitoso');
          localStorage.setItem('userId', data.userId); // Guarda el ID del usuario
          localStorage.setItem('username', data.username); // Guarda el nombre del usuario
          localStorage.setItem('role', data.role); // Guarda el rol del usuario
          onLogin(); // Actualiza el estado de isLoggedIn en App.js
          navigate('/admin/products'); // Redirige a ProductAdmin
        } else {
          alert(`Error: ${data.error}`);
        }
      })
      .catch((error) => {
        setIsLoading(false);
        console.error('Error al iniciar sesión como admin:', error);
        alert('Inicio de sesión fallido. Verifica la contraseña.');
      });
  };

  return (
    <form onSubmit={handleLogin}>
      <h1>Iniciar sesión como Admin</h1>
      <input
        type="password"
        placeholder="Contraseña de Admin"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        disabled={isLoading}
      />
      <button type="submit" disabled={isLoading}>
        {isLoading ? 'Iniciando sesión...' : 'Iniciar sesión'}
      </button>
    </form>
  );
};

export default LoginAdmin;


// Final del archivo LoginAdmin.js