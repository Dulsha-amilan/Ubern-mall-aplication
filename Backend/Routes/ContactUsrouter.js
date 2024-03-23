// routes/contactRoutes.js

const express = require('express');
const router = express.Router();
const Contact = require('../Model/ContactUs');

// Handle POST request to submit contact form
router.post('/', async (req, res) => {
  try {
    const { firstName, lastName, email, subject, message, subscribe } = req.body;

    // Create a new contact record
    const contact = new Contact({
      firstName,
      lastName,
      email,
      subject,
      message,
      subscribe
    });

    // Save the contact record to the database
    await contact.save();

    // Respond with success message
    res.status(201).json({ message: 'Contact form submitted successfully' });
  } catch (error) {
    // Handle error
    console.error('Error submitting contact form:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});
router.route("/get").get((req,res)=>{

    Contact.find().then((contact)=>{
         res.json(contact)
     }).catch((err)=>{
         console.log(err);
     })
 })

module.exports = router;
