import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import axios from "axios";
import { v4 as uuidv4 } from "uuid";
import Lottie from 'react-lottie';
import animationData from './Images/Animation - 1711108589839.json';
export default function AddEmployee() {
  const [ItemID, setItemID] = useState(
    `item${Math.floor(Math.random() * 10000).toString().padStart(4, "0")}`
  );
  const [name, setName] = useState("");
  const [filepath, setFilepath] = useState("");
  const [price, setPrice] = useState("");
  const [catogory, setCatogory] = useState("");
  const [description, setDescription] = useState("");
  const [count, setCount] = useState("");
  const [join, setJoin] = useState(getCurrentDate());
  const [errors, setErrors] = useState({});
  const [phoneError, setPhoneError] = useState("");

  function getCurrentDate() {
    const currentDate = new Date();
    const year = currentDate.getFullYear();
    const month = String(currentDate.getMonth() + 1).padStart(2, "0");
    const day = String(currentDate.getDate()).padStart(2, "0");
    return `${year}-${month}-${day}`;
  }

  useEffect(() => {
    setJoin(getCurrentDate());
  }, []);

  const handlePhoneChange = (e) => {
    setPrice(e.target.value);

    const phoneRegex = /^\d{10}$/;
    if (!phoneRegex.test(e.target.value)) {
      setPhoneError("Invalid phone number");
      document.getElementById("phone-error").style.color = "red";
    } else {
      setPhoneError("");
      document.getElementById("phone-error").style.color = "inherit";
    }
  };

  const handleImage = (e) => {
    setFilepath(e.target.files[0]);
  };

  const sendData = (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("ItemID", ItemID);
    formData.append("name", name);
    formData.append("filepath", filepath);
    formData.append("count", count);
    formData.append("description", description);
    formData.append("price", price);
    formData.append("catogory", catogory);
    formData.append("join", join);

    axios
      .post("http://localhost:5000/item/add", formData)
      .then(() => {
        toast.success("Item Added Successfully!", { theme: "colored" });
      })
      .catch((err) => {
        toast.error(err);
      });
  };

  return (
    
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          minHeight: "100vh",
          backgroundImage: `url("../images/finance-background.jpg")`,
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
      <div className= "container" style={{display:"flex"}}>
        <ToastContainer></ToastContainer>
        <div className="container" style={{ display: "flex" }}>
                        <div style={{ width: '600px', height: '500px', marginTop: '10px' }}>
                            <Lottie options={{ loop: true, autoplay: true,animationData: animationData   }} />
                        </div>
                      
                        &nbsp;&nbsp;&nbsp;&nbsp;

          <div className="addEmployeeForm" style={{
                    boxShadow: "0 0 10px 0 white",
                    padding: "20px",
                    borderRadius: "10px",
                    backgroundColor: "#F5F5F5",
                    outline: "2px solid blue",
                    width:"1000px"
                }}>
          <h1 class="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl white:text-dark">
          Add New Item
              </h1>
            <form onSubmit={sendData}>
              <div className="mb-5">
                <label class="block mb-2 text-sm font-medium text-gray-900 white:text-dark">Item ID:</label>
                <input
                class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  type="text"
                  value={ItemID}
                  onChange={(e) => setItemID(e.target.value)}
                />
              </div>
              <div className="mb-5">
                <label class="block mb-2 text-sm font-medium text-gray-900 white:text-dark">Item Name:</label>
                <input
                  class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />
              </div>
              <div className="mb-5">
                <label class="block mb-2 text-sm font-medium text-gray-900 white :text-dark">Upload Image:</label>
                <input class="block w-full text-sm text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-50 dark:text-gray-400 focus:outline-none dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400" type="file" onChange={handleImage} />
              </div>
              <div className="mb-5">
                <label class="block mb-2 text-sm font-medium text-gray-900 white :text-dark">Price:</label>
                <input class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  type="text"
                  value={price}
                  onChange={(e) => setPrice(e.target.value)}
                />
              </div>
              <div className="mb-5">
                <label class="block mb-2 text-sm font-medium text-gray-900 white :text-dark">Category:</label>
                <select
               class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  value={catogory}
                  onChange={(e) => setCatogory(e.target.value)}
                >
                  <option value="">Select Category</option>
                  <option value="Chef">Nike</option>
                  <option value="Waiter">Boots</option>
                  <option value="Reseptionist">Bags</option>
                  <option value="Cleaner">Food corner</option>
                  <option value="Driver">Pizza</option>
                </select>
              </div>
              <div className="mb-5">
                <label class="block mb-2 text-sm font-medium text-gray-900 white:text-dark">Description:</label>
                <input class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  type="text"
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                />
              </div>
              <div className="mb-5">
                <label class="block mb-2 text-sm font-medium text-gray-900 white:text-dark">Count:</label>
                <input
                class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  type="text"
                  value={count}
                  onChange={(e) => setCount(e.target.value)}
                />
              </div>
              <div className="mb-5">
                <label class="block mb-2 text-sm font-medium text-gray-900 white:text-dark">Add Date:</label>
                <input
                class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  type="date"
                  value={join}
                  onChange={(e) => setJoin(e.target.value)}
                />
              </div>
              <button class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800" type="submit">Add</button>
              <Link class="text-gray-900 bg-white border border-gray-300 focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-100 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-gray-800 dark:text-white dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-600 dark:focus:ring-gray-700"  to={"/viewemployee"}>Back</Link>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
