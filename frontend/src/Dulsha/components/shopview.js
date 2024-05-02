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
          {items.length > 0 ? (
            <ul>
              {items.map(item => (
                <li key={item._id}>
                  <p>{item.name}</p>
                  <p>{item.price}</p>
                </li>
              ))}
            </ul>
          ) : (
            <p>No items available in this shop.</p>
          )}
        </div>
      ) : (
        <p>Loading...</p>
      )}
           <Footer />
    </div>
  );
};

export default ShopDetails;
