// Inicio del archivo Register.js
import React, { useState } from 'react';
import './Register.css';

const Register = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const validateEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/; // Regex para validar correos
    return emailRegex.test(email);
  };

  const validatePassword = (password) => {
    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
    return passwordRegex.test(password);
  };

  const handleRegister = (event) => {
    event.preventDefault();

    // Validación del correo
    if (!validateEmail(username)) {
      alert('Por favor, ingresa un correo electrónico válido.');
      return;
    }

    // Validación de la contraseña
    if (!validatePassword(password)) {
      alert(
        'La contraseña debe tener al menos 8 caracteres, incluyendo letras mayúsculas, minúsculas, un número y un carácter especial.'
      );
      return;
    }

    setIsLoading(true);

    fetch(`${process.env.REACT_APP_API_URL}/users/register`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ username, password }),
    })
      .then((response) => {
        if (!response.ok) {
          throw response; // Lanza el error para manejarlo en el catch
        }
        return response.json();
      })
      .then((data) => {
        setIsLoading(false);
        if (data.success) {
          alert('Registro exitoso');
          setUsername('');
          setPassword('');
        } else {
          alert(`Error en el registro: ${data.error || 'Problema desconocido.'}`);
        }
      })
      .catch(async (error) => {
        setIsLoading(false);

        // Intentar obtener el mensaje del error en el backend
        try {
          const errorData = await error.json();
          alert(`Error: ${errorData.error || 'Problema desconocido'}`);
        } catch {
          console.error('Error:', error);
          alert(`Error al conectarse con el servidor: ${error.statusText || error.message}`);
        }
      });
  };

  return (
    <form onSubmit={handleRegister} className="register-form">
      <h2 className="register-title">Registro</h2>
      <input
        type="text"
        placeholder="Correo electrónico"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
        disabled={isLoading}
        className="register-input"
      />
      <input
        type="password"
        placeholder="Contraseña"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        disabled={isLoading}
        className="register-input"
      />
      <button type="submit" disabled={isLoading} className="register-button">
        {isLoading ? 'Registrando...' : 'Registrarse'}
      </button>
    </form>
  );
};

export default Register;

// Final del archivo Register.js