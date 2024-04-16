import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';

export default function CusHome() {
  const [items, setItems] = useState([]);
  const { id } = useParams();

  useEffect(() => {
    // Fetch items associated with the selected shop
    axios.get(`http://localhost:5000/shop/${id}/items`)
      .then(response => {
        setItems(response.data);
      })
      .catch(error => {
        console.error('Error fetching items:', error);
      });
  }, [id]);

  return (
    <div>
      <h2>Items in this shop:</h2>
      <ul>
        {items.map(item => (
          <li key={item._id}>{item.name}</li>
        ))}
      </ul>
    </div>
  );
}
