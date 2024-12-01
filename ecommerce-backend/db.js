// Inicio del archivo db.js
// Este archivo centraliza la lógica de conexión a la base de datos y verifica si existe.
const sqlite3 = require('sqlite3').verbose();
const fs = require('fs');
const bcrypt = require('bcrypt');
require('dotenv').config();

const dbFile = process.env.DB_PATH || './database.sqlite';
const dbExists = fs.existsSync(dbFile);

// Crear o conectar la base de datos
const db = new sqlite3.Database(dbFile);

if (!dbExists) {
  db.serialize(() => {
    db.run(`
      CREATE TABLE products (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        name TEXT,
        category TEXT,
        price REAL,
        image TEXT
      )
    `);

    db.run(`
      INSERT INTO products (id, name, category, price, image)
      VALUES (1, 'Arverja Verde x 01 kg.', 'Menestras', 12.0, 'arverja-verde.jpg')
    `);

    db.run(`
      INSERT INTO products (id, name, category, price, image)
      VALUES (2, 'Frijol Caballero x 01 kg.', 'Menestras', 13.5, 'frijol-caballero.jpg')
    `);

    db.run(`
      INSERT INTO products (id, name, category, price, image)
      VALUES (3, 'Frijol Canario x 01 kg.', 'Menestras', 14, 'frijol-canario.jpg')
    `);

    db.run(`
      INSERT INTO products (id, name, category, price, image)
      VALUES (4, 'Frijol Castilla x 01 kg.', 'Menestras', 11.5, 'frijol-castilla.jpg')
    `);

    db.run(`
      INSERT INTO products (id, name, category, price, image)
      VALUES (5, 'Frijol Negro x 01 kg.', 'Menestras', 14.5, 'frijol-negro.jpg')
    `);

    db.run(`
      INSERT INTO products (id, name, category, price, image)
      VALUES (6, 'Frijol Panamito x 01 kg.', 'Menestras', 9.2, 'frijol-panamito.jpg')
    `);

    db.run(`
      INSERT INTO products (id, name, category, price, image)
      VALUES (7, 'Frijol Rojo x 01 kg.', 'Menestras', 16, 'frijol-rojo.jpg')
    `);

    db.run(`
      INSERT INTO products (id, name, category, price, image)
      VALUES (8, 'Garbanzo x 01 kg.', 'Menestras', 11.1, 'garbanzo.jpg')
    `);

    // Crear tabla users
    db.run(`
      CREATE TABLE users (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        username TEXT NOT NULL,
        password TEXT NOT NULL,
        role TEXT DEFAULT 'user' -- Campo de rol para definir permisos
      )
    `);

    // Crear tabla de historial de búsqueda
    db.run(`
      CREATE TABLE search_history (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        user_id INTEGER NOT NULL,
        search_term TEXT NOT NULL,
        created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
        FOREIGN KEY (user_id) REFERENCES users (id)
      )
    `);

  });
}

// Verificar y crear el usuario admin si no existe
const adminPassword = process.env.ADMIN_PASSWORD; // Cargar la contraseña desde .env
if (!adminPassword) {
  console.error('ERROR: ADMIN_PASSWORD no está definido en el archivo .env');
  process.exit(1); // Finalizar el proceso si falta la contraseña
}

db.serialize(() => {
  db.get(`SELECT * FROM users WHERE username = 'admin'`, async (err, row) => {
    if (err) {
      console.error('Error al verificar el usuario admin:', err);
      return;
    }

    if (!row) {
      console.log('El usuario admin no existe. Creándolo...');
      try {
        const hashedAdminPassword = await bcrypt.hash(adminPassword, 10); // Generar el hash de la contraseña
        db.run(
          `INSERT INTO users (username, password, role) VALUES (?, ?, ?)`,
          ['admin', hashedAdminPassword, 'admin'],
          (err) => {
            if (err) {
              console.error('Error al crear el usuario admin:', err);
            } else {
              console.log('Usuario admin creado exitosamente.');
            }
          }
        );
      } catch (hashError) {
        console.error('Error al generar el hash de la contraseña del admin:', hashError);
      }
    } else {
      console.log('El usuario admin ya existe.');
    }
  });
});


module.exports = db;

// Final del archivo db.js