// Inicio del archivo Dashboard.js
import React, { useEffect, useState } from 'react';
import './Dashboard.css'; // Importa el archivo de estilos

const Dashboard = () => {
  const [searchHistory, setSearchHistory] = useState([]);
  const userId = localStorage.getItem('userId'); // Obtén el ID del usuario desde el almacenamiento local
  const username = localStorage.getItem('username'); // Obtén el nombre de usuario desde el almacenamiento local

  useEffect(() => {
    if (!userId) return;

    fetch(`${process.env.REACT_APP_API_URL}/search/history/${userId}`)
      .then((response) => response.json())
      .then((data) => {
        if (data.success) {
          setSearchHistory(data.history);
        } else {
          console.error('Error al obtener historial:', data.error);
        }
      })
      .catch((err) => console.error('Error al conectar con el backend:', err));
  }, [userId]);

  return (
    <div className="dashboard-container">
      <h1 className="dashboard-title">{username}: ¡Bienvenido a tu Dashboard!</h1>
      <h2 className="dashboard-subtitle">Historial de búsquedas</h2>
      <ul className="dashboard-search-history">
        {searchHistory.length > 0 ? (
          searchHistory.map((entry, index) => (
            <li key={index} className="dashboard-search-item">
              <span className="search-term">{entry.search_term}</span>
              <small className="search-date">
                {new Date(entry.created_at).toLocaleString()}
              </small>
            </li>
          ))
        ) : (
          <p className="no-history">No tienes búsquedas recientes.</p>
        )}
      </ul>
    </div>
  );
};

export default Dashboard;

// Final del archivo Dashboard.js
