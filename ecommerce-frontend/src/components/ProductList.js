// Inicio del archivo ProductList.js
import React, { useEffect, useState } from 'react';
import './ProductList.css'; // Importa el archivo CSS

const ProductList = () => {
  const [products, setProducts] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [filteredProducts, setFilteredProducts] = useState([]);

  // useEffect(() => {
  //   // Cargar todos los productos al montar el componente
  //   fetch(`${process.env.REACT_APP_API_URL}/products`)
  //     .then((response) => response.json())
  //     .then((data) => {
  //       setProducts(data);
  //       setFilteredProducts(data); // Mostrar todos los productos inicialmente
  //     })
  //     .catch((error) => console.error('Error al usar fetch', error));
  // }, []);

  useEffect(() => {
    fetch(`${process.env.REACT_APP_API_URL}/products`)
      .then((response) => response.json())
      .then((data) => {
        if (Array.isArray(data)) {
          setProducts(data);
          setFilteredProducts(data); // Inicializa filteredProducts con los datos obtenidos
        } else if (data.products && Array.isArray(data.products)) {
          // Si el backend devuelve un objeto con una clave `products`
          setProducts(data.products);
          setFilteredProducts(data.products);
        } else {
          console.error('Los datos no son un array:', data);
          setProducts([]);
          setFilteredProducts([]);
        }
      })
      .catch((error) => {
        console.error('Error al obtener productos:', error);
        setProducts([]);
        setFilteredProducts([]);
      });
  }, []);
  

  const handleSearch = (event) => {
    setSearchTerm(event.target.value);
  };

  const handleSearchSubmit = (event) => {
    event.preventDefault(); // Prevenir el comportamiento predeterminado del formulario

    // Filtrar productos basados en el término de búsqueda
    const filtered = products.filter((product) =>
      product.name.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredProducts(filtered);

    // Guardar el término de búsqueda en el backend
    if (searchTerm.trim()) {
      saveSearch(searchTerm);
    }
  };

  const formatCurrency = (value) => {
    return new Intl.NumberFormat('es-PE', { style: 'currency', currency: 'PEN' }).format(value);
  };

  const saveSearch = (searchTerm) => {
    console.log('Guardando búsqueda:', searchTerm);
    const userId = localStorage.getItem('userId'); // Obtén el ID del usuario desde el almacenamiento local

    if (!userId) {
      console.log('Usuario no autenticado. No se puede guardar la búsqueda.');
      return;
    }

    if (!searchTerm.trim()) {
      console.error('Término de búsqueda vacío. No se guardará.');
      return;
    }

    fetch(`${process.env.REACT_APP_API_URL}/search/save-search`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ userId, searchTerm }),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log('Respuesta del servidor:', data);
        if (!data.success) {
          console.error('Error al guardar búsqueda:', data.error);
        }
      })
      .catch((err) => console.error('Error al enviar búsqueda:', err));
  };

  return (
    <div className="product-list-container">
      <h2 className="product-list-title">Lista de Menestras</h2>
      <form onSubmit={handleSearchSubmit} className="search-bar">
        <input
          type="text"
          placeholder="Buscar productos..."
          value={searchTerm}
          onChange={handleSearch}
          className="search-input"
        />
        <button type="submit" className="search-button">
          Buscar
        </button>
      </form>
      {/* <div className="product-list">
        {filteredProducts.map((product) => (
          <div key={product.id} className="product-card">
            <img
              src={`${process.env.REACT_APP_API_URL}/images/${product.image}`}
              alt={product.name}
              className="product-image"
            />
            <div className="product-info">
              <h3 className="product-name">{product.name}</h3>
              <p className="product-price">{formatCurrency(product.price)}</p>
            </div>
          </div>
        ))}
      </div> */}
      
      <div className="product-list">
        {Array.isArray(filteredProducts) && filteredProducts.length > 0 ? (
          filteredProducts.map((product) => (
            <div key={product.id} className="product-card">
              <img
                src={`${process.env.REACT_APP_API_URL}/images/${product.image}`}
                alt={product.name}
                className="product-image"
              />
              <div className="product-info">
                <h3 className="product-name">{product.name}</h3>
                <p className="product-price">{formatCurrency(product.price)}</p>
              </div>
            </div>
          ))
        ) : (
          <p>No hay productos disponibles.</p>
        )}
      </div>


    </div>
  );
};

export default ProductList;

// Final del archivo ProductList.js
