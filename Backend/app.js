const express = require('express');
const mongoose = require('mongoose');
require('dotenv').config(); // Load environment variables from .env file
const cors = require('cors'); // Import cors package

const app = express();
const PORT = process.env.PORT || 5000;
const MONGODB_URI = process.env.MONGODB_URI;
const bodyParser = require("body-parser");
// Middleware
app.use(express.json());
app.use(cors()); // Allow all origins for now, you can configure it more restrictively
app.use(bodyParser.json());
app.use('/images', express.static('images'));

const userRoutes = require("./Routes/Users");
app.use("/api/users",userRoutes);
const authRoutes = require("./Routes/auth");
app.use("/api/auth",authRoutes);
const employeeRouter = require("./Routes/employees");
app.use("/employees", employeeRouter);
const orderRouter = require("./Routes/orders");
app.use("/orders", orderRouter);
const ShopRouter = require("./Routes/Shop");
app.use("/shop", ShopRouter);
const SupplierRoutes = require("./Routes/Supplier");
app.use("/api/supplier",SupplierRoutes);
const SupplierauthRoutes = require("./Routes/Supplierauth");
app.use("/api/supplierauth",SupplierauthRoutes);

const ContactUs=require("./Routes/ContactUsrouter");
app.use("/contactus",ContactUs);

const ItemRouter=require("./Routes/Item")
app.use("/item",ItemRouter);

const locationRoutes = require('./Routes/locationRoutes');
app.use('/api', locationRoutes);



// Connect to MongoDB
mongoose.connect(MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    console.log("Connected to MongoDB");
    // Start the server after successful database connection
    app.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}`);
    });
  })
  .catch(error => {
    console.error("Error connecting to MongoDB:", error);
  });
