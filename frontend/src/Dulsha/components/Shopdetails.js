import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { FaUserCircle, FaStar, FaMapMarkerAlt, FaPhoneAlt, FaEnvelope } from 'react-icons/fa';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import { toast, ToastContainer } from 'react-toastify'; // Import ToastContainer here

export default function CusHome() {
  const [featuredStores, setFeaturedStores] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:5000/shop')
      .then(response => {
        setFeaturedStores(response.data);
      })
      .catch(error => {
        console.error('Error fetching featured stores:', error);
      });
  }, []);

  const handleDelete = (id) => {
    axios.delete(`http://localhost:5000/shop/delete/${id}`)
      .then(response => {
        toast.success(response.data.status);
        setFeaturedStores(prevState => prevState.filter(store => store._id !== id));
      })
      .catch(error => {
        console.error('Error deleting shop:', error);
        toast.error('Error deleting shop');
      });
  };

  return (
    <div className="bg-gradient-to-b from-gray-100 to-white">
      <ToastContainer /> {/* Use ToastContainer here */}
      <div className="bg-gradient-to-b from-gray-100 to-white">
        <div className="container mx-auto px-4 py-12">
          <h2 className="text-3xl font-bold text-gray-800 mb-4">Featured Stores</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {featuredStores.map(store => (
              <div key={store._id} className="bg-white rounded-lg shadow-md p-6 flex flex-col items-center">
                <img
                  src={`http://localhost:5000/images/${store.filepath}`}
                  alt="Store Logo"
                  className="mb-4"
                />
                <h3 className="text-lg font-bold mb-2">{store.name}</h3>
                <p className="text-gray-600 mb-4 text-center">
                  {store.catogory}
                </p>
                <Link to={`/shop/${store._id}`} className="bg-indigo-600 text-white py-2 px-4 rounded-lg hover:bg-indigo-700 transition-colors duration-300">
                  Visit Store
                </Link>
                <button
                  onClick={() => handleDelete(store._id)}
                  className="bg-red-600 text-white py-2 px-4 rounded-lg hover:bg-red-700 transition-colors duration-300 mt-2"
                >
                  Delete
                </button>
              </div>
            ))}
          </div>
        </div>
      </div>
      {/* Other sections... */}
    </div>
  );
}
