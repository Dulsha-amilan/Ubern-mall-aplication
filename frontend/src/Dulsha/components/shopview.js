import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import Header from '../../Janidu/navbar';
import Footer from '../../Janidu/footer';

const ShopDetails = () => {
  const [shop, setShop] = useState(null);
  const [items, setItems] = useState([]);
  const { id } = useParams();

  useEffect(() => {
    // Fetch shop details
    axios.get(`http://localhost:5000/shop/${id}`)
      .then(response => {
        setShop(response.data);
      })
      .catch(error => {
        console.error('Error fetching shop details:', error);
      });

    // Fetch items associated with the shop
    axios.get(`http://localhost:5000/item/shop/${id}`)
      .then(response => {
        setItems(response.data);
      })
      .catch(error => {
        console.error('Error fetching items:', error);
      });
  }, [id]);

  return (
    <div>
       <Header />
      {shop ? (
        <div >
           <h1 className="text-3xl font-bold mb-8 text-center">{shop.name} Shop</h1>
          <h2>Our Products</h2>
          <p>{shop.category}</p>
          <h3>Items in this Shop:</h3>
      
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {items.map((item) => (
            <div key={item._id} className="bg-white rounded-lg shadow-md overflow-hidden">
              <img className="w-full h-64 object-cover object-center" src={`http://localhost:5000/images/${item.filepath}`}  />
              <div className="p-4">
                <p className="text-xl font-bold mb-2">{item.name}</p>
                <p className="text-gray-700 mb-2">{item.description}</p>
                <p className="text-gray-900 font-bold">{item.price}</p><br></br>
                <a href="/addlocation" class="inline-flex items-center px-3 py-2 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
            Read more
             <svg class="rtl:rotate-180 w-3.5 h-3.5 ms-2" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 10">
                <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M1 5h12m0 0L9 1m4 4L9 9"/>
            </svg>
        </a>
              </div>
            </div>
          ))}
        </div>
        </div>
      ) : (
        <p>Loading...</p>
      )}
           <Footer />
    </div>
  );
};

export default ShopDetails;
