// Inicio del archivo products.js
// Este archivo contiene todas las rutas relacionadas con los productos.
const express = require('express');
const router = express.Router();

module.exports = (db) => {
  // Obtener todos los productos
  router.get('/', (req, res) => {
    db.all("SELECT * FROM products", [], (err, rows) => {
      if (err) {
        console.error('Error al obtener productos:', err);
        return res.status(500).json({ success: false, error: 'Error al obtener productos' });
      }
      res.json({ success: true, products: rows });
    });
  });

  // Crear un nuevo producto
  router.post('/', (req, res) => {
    const { name, category, price, image } = req.body;
    if (!name || !category || price == null || !image) {
      return res.status(400).json({ success: false, error: 'Faltan datos del producto' });
    }
    db.run(
      "INSERT INTO products (name, category, price, image) VALUES (?, ?, ?, ?)",
      [name, category, price, image],
      function (err) {
        if (err) {
          console.error('Error al crear producto:', err);
          return res.status(500).json({ success: false, error: 'Error al crear producto' });
        }
        res.json({ success: true, productId: this.lastID });
      }
    );
  });

  // Actualizar un producto
  router.put('/:id', (req, res) => {
    const { id } = req.params;
    const { name, category, price, image } = req.body;
    if (!name || !category || price == null || !image) {
      return res.status(400).json({ success: false, error: 'Faltan datos del producto' });
    }
    db.run(
      "UPDATE products SET name = ?, category = ?, price = ?, image = ? WHERE id = ?",
      [name, category, price, image, id],
      function (err) {
        if (err) {
          console.error('Error al actualizar producto:', err);
          return res.status(500).json({ success: false, error: 'Error al actualizar producto' });
        }
        res.json({ success: true });
      }
    );
  });

  // Eliminar un producto
  router.delete('/:id', (req, res) => {
    const { id } = req.params;
    db.run("DELETE FROM products WHERE id = ?", [id], function (err) {
      if (err) {
        console.error('Error al eliminar producto:', err);
        return res.status(500).json({ success: false, error: 'Error al eliminar producto' });
      }
      res.json({ success: true });
    });
  });

  return router;
};

// Final del archivo products.js