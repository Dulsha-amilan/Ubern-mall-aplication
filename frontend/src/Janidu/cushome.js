// shop.js

import React from 'react';
import { FaUserCircle, FaStar, FaMapMarkerAlt, FaPhoneAlt, FaEnvelope } from 'react-icons/fa';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import ChatbotPopup from './bot';
import Footer from './footer';
import Header from './navbar';
import img1 from './img/banner1.png';
import img2 from './img/banner1-1.png';
import img3 from './img/banner1-2.png';
import axios from 'axios';
import { useState, useEffect } from 'react';
import { Link } from "react-router-dom";
import jsPDF from "jspdf";
import { toast, ToastContainer } from "react-toastify";
import ShopDetails from '../Dulsha/components/shopview'; // Changed the path to ShopDetails component

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

  const settings = {
    dots: true,
    infinite: true,
    speed: 1000,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000,
  };

  return (
    <div className="bg-gradient-to-b from-gray-100 to-white">
      <Header />
      <div className="container mx-auto px-4 py-12">
        <Slider {...settings}>
          <div>
            <img
              src={img1}
              alt="Slider Image 1"
              className="rounded-lg shadow-md"
            />
          </div>
          <div>
            <img
              src={img2}
              alt="Slider Image 2"
              className="rounded-lg shadow-md"
            />
          </div>
          <div>
            <img
              src={img3}
              alt="Slider Image 3"
              className="rounded-lg shadow-md"
            />
          </div>
        </Slider>
      </div>
      <div className="bg-indigo-600 py-20">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-4xl font-bold text-white mb-4">Welcome to Our Mall</h1>
          <p className="text-lg text-gray-300 mb-8">Explore a world of shopping, dining, and entertainment.</p>
          <a href='/about'>
            <button className="bg-white text-indigo-600 py-3 px-6 rounded-lg hover:bg-indigo-700 hover:text-white transition-colors duration-300">
              About Us
            </button>
          </a>
        </div>
      </div>
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
              </div>
            ))}
          </div>
        </div>
      </div>
      {/* Other sections */}
      <ChatbotPopup />
      <Footer />
    </div>
  );
};
