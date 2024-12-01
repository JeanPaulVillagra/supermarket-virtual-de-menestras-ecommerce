// Inicio del archivo ecommerce-backend/server.js
// Este archivo importa las rutas y configura el servidor principal.
require('dotenv').config();
const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');

const path = require('path'); // Importación añadida para servir imágenes
const db = require('./db'); // Conexión a la base de datos

const productsRoutes = require('./routes/products'); // Rutas de productos
const usersRoutes = require('./routes/users'); // Rutas de usuarios
const searchRoutes = require('./routes/search'); // Rutas de búsuqedas


const app = express();
const port = process.env.PORT || 3001;

// Middleware
app.use(cors());
app.use(bodyParser.json());

// Servir imágenes estáticas desde la carpeta 'images'
app.use('/api/images', express.static(path.join(__dirname, 'images')));

// Registrar Rutas
app.use('/api/products', productsRoutes(db)); // Prefijo para rutas de productos
app.use('/api/users', usersRoutes(db)); // Prefijo para rutas de usuarios
app.use('/api/search', searchRoutes(db)); // Prefijo para rutas de búsquedas

// Iniciar servidor
app.listen(port, () => {
  console.log(`Backend running at http://localhost:${port}`);
});

// Fin del archivo ecommerce-backend/server.js