// Inicio del archivo users.js
// Este archivo contiene todas las rutas relacionadas con los usuarios.
const express = require('express');
const bcrypt = require('bcrypt');
const router = express.Router();

module.exports = (db) => {
  // Registro de usuarios
  router.post('/register', async (req, res) => {
    const { username, password } = req.body;

    if (!username || !password) {
      return res.status(400).json({ success: false, error: 'Faltan datos' });
    }

    try {
      // Validar si el usuario ya existe
      db.get("SELECT * FROM users WHERE username = ?", [username], async (err, row) => {
        if (err) {
          return res.status(500).json({ success: false, error: 'Error del servidor' });
        }

        if (row) {
          return res.status(400).json({ success: false, error: 'El usuario ya existe' });
        }

        // Hashear la contraseña
        const hashedPassword = await bcrypt.hash(password, 10);

        // Insertar el usuario
        db.run(
          "INSERT INTO users (username, password) VALUES (?, ?)",
          [username, hashedPassword],
          function (err) {
            if (err) {
              return res.status(500).json({ success: false, error: 'Error al registrar el usuario' });
            }
            res.json({ success: true, userId: this.lastID });
          }
        );
      });
    } catch (err) {
      res.status(500).json({ success: false, error: 'Error interno del servidor' });
    }
  });

  // Inicio de sesión
  router.post('/login', (req, res) => {
    const { username, password } = req.body;

    if (!username || !password) {
      return res.status(400).json({ success: false, error: 'Faltan datos' });
    }

    // Buscar al usuario en la base de datos
    db.get("SELECT * FROM users WHERE username = ?", [username], async (err, user) => {
      if (err) {
        console.error('Error al buscar usuario:', err);
        return res.status(500).json({ success: false, error: 'Error del servidor' });
      }

      if (!user) {
        return res.status(401).json({ success: false, error: 'Usuario no encontrado' });
      }

      console.log('Usuario encontrado:', user);

      try {
        // Comparar la contraseña enviada con el hash almacenado
        const isMatch = await bcrypt.compare(password, user.password);

        if (!isMatch) {
          return res.status(401).json({ success: false, error: 'Credenciales inválidas' });
        }

        // Opcional: Generar un token de autenticación si lo necesitas
        res.json({ success: true, userId: user.id, message: 'Inicio de sesión exitoso' });
      } catch (error) {
        console.error('Error al comparar contraseñas:', error);
        res.status(500).json({ success: false, error: 'Error interno del servidor' });
      }
    });
  });

  // Inicio de sesión para el usuario admin
  router.post('/login-admin', (req, res) => {
    const { password } = req.body;

    if (!password) {
      return res.status(400).json({ success: false, error: 'Falta la contraseña' });
    }

    db.get(
      "SELECT id, username, role, password FROM users WHERE username = 'admin'",
      async (err, row) => {
        if (err || !row) {
          return res.status(500).json({ success: false, error: 'Usuario admin no encontrado' });
        }

        // Verificar la contraseña
        const isValid = await bcrypt.compare(password, row.password);
        if (!isValid) {
          return res.status(401).json({ success: false, error: 'Contraseña incorrecta' });
        }

        // Responder con éxito
        res.json({
          success: true,
          userId: row.id,
          username: row.username,
          role: row.role,
        });
      }
    );
  });

  return router;
};

// Final del archivo users.js