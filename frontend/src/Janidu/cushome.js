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
import  {useState, useEffect} from 'react';
import { Link, useParams } from "react-router-dom";
import jsPDF from "jspdf";
import { toast, ToastContainer } from "react-toastify";

export default function CusHome(){
  const [featuredStores, setFeaturedStores] = useState([]);

  useEffect(() => {
    // Fetch featured stores data from your backend API
    axios.get('http://localhost:5000/shop') // Assuming your API endpoint for fetching shops is '/shop'
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


      {/* Image Slider */}
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

      {/* Hero Banner */}
      <div className="bg-indigo-600 py-20">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-4xl font-bold text-white mb-4">Welcome to Our Mall</h1>
          <p className="text-lg text-gray-300 mb-8">Explore a world of shopping, dining, and entertainment.</p>
          <a href='/about'>
          <button 
          
           className="bg-white text-indigo-600 py-3 px-6 rounded-lg hover:bg-indigo-700 hover:text-white transition-colors duration-300">
            About Us
          </button>
          </a>

        </div>
      </div>

      <div className="bg-gradient-to-b from-gray-100 to-white">
      {/* Your existing code */}
      
      {/* Featured Stores Section */}
      <div className="container mx-auto px-4 py-12">
        <h2 className="text-3xl font-bold text-gray-800 mb-4">Featured Stores</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Map over featured stores and render store cards */}
          {featuredStores.map(store => (
            <div key={store._id} className="bg-white rounded-lg shadow-md p-6 flex flex-col items-center">
              <img
                src={`http://localhost:5000/images/${store.filepath}`} 
                alt="Store Logo"
                className="mb-4"
              />
              <h3 className="text-lg font-bold mb-2">{store.name}</h3>
              <p className="text-gray-600 mb-4 text-center">
                {store.catogory} {/* Assuming catogory is the category of the store */}
              </p>
              <Link to={`http://localhost:5000/shop/${store._id}`} className="bg-indigo-600 text-white py-2 px-4 rounded-lg hover:bg-indigo-700 transition-colors duration-300">
                Visit Store
              </Link>
            </div>
          ))}
        </div>
      </div>

      {/* Your existing code */}
    </div>

      {/* Dining Section */}
      <div className="bg-gray-100 py-12">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-gray-800 mb-4">
            Dining Experience
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div>
              <img
                src="https://via.placeholder.com/600x400"
                alt="Dining Area"
                className="rounded-lg shadow-md"
              />
            </div>
            <div>
              <h3 className="text-2xl font-bold mb-4">Savor the Flavors</h3>
              <p className="text-gray-600 mb-4">
                Indulge in a culinary adventure with our diverse selection of
                restaurants, cafes, and eateries. From casual dining to fine
                dining, we have something to satisfy every palate.
              </p>
              <button className="bg-indigo-600 text-white py-2 px-4 rounded-lg hover:bg-indigo-700 transition-colors duration-300">
                View Restaurants
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Events Section */}
      <div className="container mx-auto px-4 py-12">
        <h2 className="text-3xl font-bold text-gray-800 mb-4">
          Upcoming Events
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {/* Event Card 1 */}
          <div className="bg-white rounded-lg shadow-md p-6 flex flex-col">
            <img
              src="https://via.placeholder.com/400x200"
              alt="Event Image"
              className="mb-4 rounded-lg"
            />
            <h3 className="text-lg font-bold mb-2">Music Festival</h3>
            <p className="text-gray-600 mb-4">
              Join us for a weekend of live music, food, and fun at our annual
              music festival.
            </p>
            <button className="bg-indigo-600 text-white py-2 px-4 rounded-lg hover:bg-indigo-700 transition-colors duration-300 mt-auto">
              Learn More
            </button>
          </div>
          {/* Event Card 2 */}
          <div className="bg-white rounded-lg shadow-md p-6 flex flex-col">
            <img
              src="https://via.placeholder.com/400x200"
              alt="Event Image"
              className="mb-4 rounded-lg"
            />
            <h3 className="text-lg font-bold mb-2">Art Exhibition</h3>
            <p className="text-gray-600 mb-4">
              Explore the works of talented local artists at our art exhibition.
            </p>
            <button className="bg-indigo-600 text-white py-2 px-4 rounded-lg hover:bg-indigo-700 transition-colors duration-300 mt-auto">
              Learn More
            </button>
          </div>
          {/* Event Card 3 */}
          <div className="bg-white rounded-lg shadow-md p-6 flex flex-col">
            <img
              src="https://via.placeholder.com/400x200"
              alt="Event Image"
              className="mb-4 rounded-lg"
            />
            <h3 className="text-lg font-bold mb-2">Fitness Challenge</h3>
            <p className="text-gray-600 mb-4">
              Join our fitness challenge and get motivated to stay active and
              healthy.
            </p>
            <button className="bg-indigo-600 text-white py-2 px-4 rounded-lg hover:bg-indigo-700 transition-colors duration-300 mt-auto">
              Learn More
            </button>
          </div>
        </div>
      </div>

     {/* Contact Section */}
<div className="bg-gray-100 py-12">
  <div className="container mx-auto px-4">
    <h2 className="text-3xl font-bold text-gray-800 mb-4">
      Get in Touch
    </h2>
    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
      <div>
        <h3 className="text-2xl font-bold mb-4">Visit Us</h3>
        <div className="mb-4 flex items-center">
          <FaMapMarkerAlt className="text-indigo-600 mr-2" />
          <p className="text-gray-600">123 Main Street, City, State</p>
        </div>
        <div className="mb-4 flex items-center">
          <FaPhoneAlt className="text-indigo-600 mr-2" />
          <p className="text-gray-600">(123) 456-7890</p>
        </div>
        <div className="flex items-center">
          <FaEnvelope className="text-indigo-600 mr-2" />
          <p className="text-gray-600">info@mallwebsite.com</p>
        </div>
      </div>
      <div>
        <h3 className="text-2xl font-bold mb-4">Send a Message</h3>
        <button
          onClick={() => {
            // Redirect logic here
            window.location.href = '/feedback';
          }}
          className="bg-indigo-600 text-white py-2 px-4 rounded-lg hover:bg-indigo-700 transition-colors duration-300"
        >
          Contact Us
        </button>
      </div>
    </div>
  </div>
</div>


      <ChatbotPopup />
      <Footer />
    </div>
  );
};

