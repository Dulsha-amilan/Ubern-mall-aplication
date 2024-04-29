import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom'; // Import useParams

const ShopDetails = () => {
  const [shop, setShop] = useState(null);
  const { id } = useParams(); // Get the id parameter from the URL

  useEffect(() => {
    axios.get(`http://localhost:5000/shop/${id}`)
      .then(response => {
        setShop(response.data);
      })
      .catch(error => {
        console.error('Error fetching shop details:', error);
      });
  }, [id]); // Include id in the dependency array

  return (
    <div>
      {shop ? (
        <div>
          <h2>{shop.name}</h2>
          <p>{shop.catogory}</p>
          {/* Add more details as needed */}
        </div>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
};

export default ShopDetails;
