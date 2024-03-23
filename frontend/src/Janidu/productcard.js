import React, { useState, useEffect } from "react";
import axios from "axios"; // Import axios for making HTTP requests

const Card = () => {
  const [items, setItems] = useState([]);

  useEffect(() => {
    const fetchItems = async () => {
      try {
        const response = await axios.get("http://localhost:5000/item/"); // Change the URL to match your backend route
        setItems(response.data);
      } catch (error) {
        console.error("Error fetching items:", error);
      }
    };

    fetchItems();
  }, []);

  return (
    <div>
      {items.map((item) => (
        <div key={item.id} className="card card-compact w-96 bg-base-100 shadow-xl">
          <figure>
            <img src={`http://localhost:5000/images/${item.filepath}`} alt={item.name} /> {/* Assuming your images are stored in the /images directory */}
          </figure>
          <div className="card-body">
            <h2 className="card-title">{item.name}</h2>
            <p>{item.description}</p>
            <p>Price: ${item.price}</p>
            <p>Category: {item.category}</p>
            <div className="card-actions justify-end">
              <button className="btn glass btn-primary">Buy Now</button>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Card;
