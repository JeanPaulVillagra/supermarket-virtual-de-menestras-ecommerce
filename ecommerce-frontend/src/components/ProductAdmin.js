// Inicio del archivo ProductAdmin.js
import React, { useState, useEffect } from 'react';
import './ProductAdmin.css';

const ProductAdmin = () => {
  const [products, setProducts] = useState([]);
  const [form, setForm] = useState({ name: '', category: '', price: '', image: '' });
  const [isEditing, setIsEditing] = useState(false);
  const [editingId, setEditingId] = useState(null);

  // Cargar productos al montar el componente
  useEffect(() => {
    fetch(`${process.env.REACT_APP_API_URL}/products`)
      .then((res) => res.json())
      .then((data) => {
        if (data.success) setProducts(data.products);
      })
      .catch((err) => console.error('Error al obtener productos:', err));
  }, []);

  // Manejar cambios en el formulario
  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  // Crear o actualizar producto
  const handleSubmit = (e) => {
    e.preventDefault();
    const method = isEditing ? 'PUT' : 'POST';
    const url = isEditing
      ? `${process.env.REACT_APP_API_URL}/products/${editingId}`
      : `${process.env.REACT_APP_API_URL}/products`;

    fetch(url, {
      method,
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(form),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.success) {
          alert(isEditing ? 'Producto actualizado' : 'Producto creado');
          setForm({ name: '', category: '', price: '', image: '' });
          setIsEditing(false);
          setEditingId(null);
          // Recargar productos
          return fetch(`${process.env.REACT_APP_API_URL}/products`)
            .then((res) => res.json())
            .then((data) => setProducts(data.products));
        } else {
          alert('Error al guardar el producto');
        }
      });
  };

  // Eliminar producto
  const handleDelete = (id) => {
    fetch(`${process.env.REACT_APP_API_URL}/products/${id}`, { method: 'DELETE' })
      .then((res) => res.json())
      .then((data) => {
        if (data.success) {
          alert('Producto eliminado');
          setProducts(products.filter((product) => product.id !== id));
        } else {
          alert('Error al eliminar producto');
        }
      });
  };

  // Preparar formulario para edición
  const handleEdit = (product) => {
    setForm(product);
    setIsEditing(true);
    setEditingId(product.id);
  };

  return (
    <div className="product-admin">
      <h1>Administrar Productos</h1>
      <form onSubmit={handleSubmit} className="product-form">
        <input
          type="text"
          name="name"
          value={form.name}
          onChange={handleChange}
          placeholder="Nombre del producto"
          required
        />
        <input
          type="text"
          name="category"
          value={form.category}
          onChange={handleChange}
          placeholder="Categoría"
          required
        />
        <input
          type="number"
          name="price"
          value={form.price}
          onChange={handleChange}
          placeholder="Precio"
          required
        />
        <input
          type="text"
          name="image"
          value={form.image}
          onChange={handleChange}
          placeholder="URL de la imagen"
          required
        />
        <button type="submit">{isEditing ? 'Actualizar' : 'Crear'}</button>
      </form>
      <table className="product-table">
        <thead>
          <tr>
            <th>Imagen</th>
            <th>Nombre</th>
            <th>Categoría</th>
            <th>Precio</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {products.map((product) => (
            <tr key={product.id}>
              <td>
                <img
                  src={`${process.env.REACT_APP_API_URL}/images/${product.image}`}
                  alt={product.name}
                  className="product-image"
                />
              </td>
              <td>{product.name}</td>
              <td>{product.category}</td>
              <td>
                {new Intl.NumberFormat('es-PE', { style: 'currency', currency: 'PEN' }).format(product.price)}
              </td>
              <td>
                <button onClick={() => handleEdit(product)}>Editar</button>
                <button onClick={() => handleDelete(product.id)}>Eliminar</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ProductAdmin;


// Final del archivo ProductAdmin.js