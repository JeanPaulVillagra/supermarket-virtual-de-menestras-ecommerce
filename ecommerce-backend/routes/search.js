// Inicio del archivo search.js
const express = require('express');
const router = express.Router();

module.exports = (db) => {
  // Ruta para guardar términos de búsqueda
  router.post('/save-search', (req, res) => {
    const { userId, searchTerm } = req.body;
    console.log('Datos recibidos para guardar búsqueda:', { userId, searchTerm });

    if (!userId || !searchTerm) {
        console.log('Faltan datos o término inválido');
        return res.status(400).json({ success: false, error: 'Faltan datos o término inválido' });
      }

    // Obtener la hora local en GMT-5
    const localTime = new Date(new Date().toLocaleString("en-US", { timeZone: "America/Lima" }));

    db.run(
      "INSERT INTO search_history (user_id, search_term, created_at) VALUES (?, ?, ?)",
      [userId, searchTerm, localTime.toISOString()],
      function (err) {
        if (err) {
          console.error('Error al guardar búsqueda:', err);
          return res.status(500).json({ success: false, error: 'Error al guardar búsqueda' });
        }
        console.log('Búsqueda guardada con éxito:', { userId, searchTerm });
        res.json({ success: true });
      }
    );
  });

  // Ruta para obtener el historial de búsqueda de un usuario
  router.get('/history/:userId', (req, res) => {
    const { userId } = req.params;

    db.all(
      "SELECT search_term, created_at FROM search_history WHERE user_id = ? ORDER BY created_at DESC LIMIT 10",
      [userId],
      (err, rows) => {
        if (err) {
          console.error('Error al obtener historial de búsqueda:', err);
          return res.status(500).json({ success: false, error: 'Error al obtener historial' });
        }
        res.json({ success: true, history: rows });
      }
    );
  });

  return router;
};

// Final del archivo search.js