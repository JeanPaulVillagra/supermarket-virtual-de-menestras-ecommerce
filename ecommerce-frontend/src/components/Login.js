// Inicio del archivo Login.js
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Login.css';

const Login = ({ onLogin }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const validateEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/; // Regex para validar correos
    return emailRegex.test(email);
  };

  const handleLogin = (event) => {
    event.preventDefault();

    if (!validateEmail(username)) {
      alert('Por favor, ingresa un correo electrónico válido.');
      return;
    }

    if (!password) {
      alert('Por favor, ingresa tu contraseña.');
      return;
    }

    setIsLoading(true);

    fetch(`${process.env.REACT_APP_API_URL}/users/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ username, password }),
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error(`Error al iniciar sesión: ${response.statusText}`);
        }
        return response.json();
      })
      .then((data) => {
        console.log('Respuesta del servidor:', data); // Verifica si `userId` está presente
        setIsLoading(false);
        if (data.success) {
          alert('Inicio de sesión exitoso');
          localStorage.setItem('username', username); // Guarda el nombre de usuario
          localStorage.setItem('userId', data.userId); // Guarda el ID del usuario
          localStorage.setItem('role', data.role); // Guarda el rol del usuario
          onLogin(); // Actualiza el estado de autenticación
          navigate('/dashboard'); // Redirige al Dashboard o página personalizada
        } else {
          alert(`Error en el inicio de sesión: ${data.error || 'Credenciales inválidas.'}`);
        }
      })
      .catch((error) => {
        setIsLoading(false);
        console.error('Error al conectarse con el servidor:', error);
        alert(`Error al conectarse con el servidor: ${error.message}`);
      });
  };

  return (
    <form onSubmit={handleLogin} className="login-form">
      <h2 className="login-title">Inicio de Sesión</h2>
      <input
        type="text"
        placeholder="Correo electrónico"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
        disabled={isLoading}
        className="login-input"
      />
      <input
        type="password"
        placeholder="Contraseña"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        disabled={isLoading}
        className="login-input"
      />
      <button type="submit" disabled={isLoading} className="login-button">
        {isLoading ? 'Iniciando sesión...' : 'Iniciar sesión'}
      </button>
    </form>
  );
};

export default Login;

// Final del archivo Login.js
