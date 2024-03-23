import React, { useState, useEffect } from 'react';
import axios from 'axios'; // Import axios for making HTTP requests
import Header from './navbar';
import Footer from './footer';

const Shop = () => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get('http://localhost:5000/item/'); // Replace the URL with your actual backend API endpoint
        setProducts(response.data);
      } catch (error) {
        console.error('Error fetching products:', error);
      }
    };

    fetchProducts();
  }, []);

  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <div className="flex-grow p-10">
        <h1 className="text-3xl font-bold mb-8 text-center">Our Products</h1>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {products.map((product) => (
            <div key={product.id} className="bg-white rounded-lg shadow-md overflow-hidden">
              <img className="w-full h-64 object-cover object-center" src={`http://localhost:5000/images/${product.filepath}`}  />
              <div className="p-4">
                <p className="text-xl font-bold mb-2">{product.name}</p>
                <p className="text-gray-700 mb-2">{product.description}</p>
                <p className="text-gray-900 font-bold">{product.price}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Shop;
