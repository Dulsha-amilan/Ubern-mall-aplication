// ContactUs.js

import React, { useState } from 'react';
import Footer from './footer'; // Assuming you have a Footer component
import Header from './navbar'; // Assuming you have a Header component

function ContactUs() {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    subject: '',
    message: '',
    subscribe: false, // Initialize subscribe as false
  });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prevState => ({
      ...prevState,
      [name]: type === 'checkbox' ? checked : value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // Send form data to backend API
      const response = await fetch('http://localhost:5000/contactus', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        // Form submitted successfully
        console.log('Form submitted successfully');
        // Clear form fields
        setFormData({
          firstName: '',
          lastName: '',
          email: '',
          subject: '',
          message: '',
          subscribe: false,
        });
      } else {
        // Error handling if submission fails
        console.error('Error submitting contact form');
      }
    } catch (error) {
      console.error('Error submitting contact form:', error);
    }
  };

  return (
    <div className="mx-auto dark:bg-gray-800">
      <Header />
      <div className="max-w-xl mx-auto p-20">

        <div className="text-center">
          <h1 className="text-3xl font-bold text-gray-800 sm:text-4xl dark:text-white">
            Contact Us
          </h1>
          <p className="mt-1 text-gray-600 dark:text-gray-400">
            Have a question or feedback? Get in touch with us.
          </p>
        </div>

        <div className="mt-12">
          {/* Form */}
          <form onSubmit={handleSubmit}>
            <div className="grid gap-4 lg:gap-6">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 lg:gap-6">
                <div>
                  <label htmlFor="first-name" className="block mb-2 text-sm text-gray-700 font-medium dark:text-white">First Name</label>
                  <input type="text" name="firstName" id="first-name" value={formData.firstName} onChange={handleChange} className="py-3 px-4 block w-full border-gray-400 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-gray-400 dark:focus:ring-white dark:bg-slate-900 dark:border-gray-700 dark:text-gray-400 dark:focus:ring-gray-600" />
                </div>

                <div>
                  <label htmlFor="last-name" className="block mb-2 text-sm text-gray-700 font-medium dark:text-white">Last Name</label>
                  <input type="text" name="lastName" id="last-name" value={formData.lastName} onChange={handleChange} className="py-3 px-4 block w-full border-gray-400 rounded-lg text-sm focus:border-blue-500 focus:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none dark:bg-slate-900 dark:border-gray-700 dark:text-gray-400 dark:focus:ring-gray-600" />
                </div>
              </div>

              <div>
                <label htmlFor="email" className="block mb-2 text-sm text-gray-700 font-medium dark:text-white">Email</label>
                <input type="email" name="email" id="email" value={formData.email} onChange={handleChange} autoComplete="email" className="py-3 px-4 block w-full border-gray-400 rounded-lg text-sm focus:border-blue-500 focus:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none dark:bg-slate-900 dark:border-gray-700 dark:text-gray-400 dark:focus:ring-gray-600" />
              </div>

              <div>
                <label htmlFor="subject" className="block mb-2 text-sm text-gray-700 font-medium dark:text-white">Subject</label>
                <input type="text" name="subject" id="subject" value={formData.subject} onChange={handleChange} className="py-3 px-4 block w-full border-gray-400 rounded-lg text-sm focus:border-blue-500 focus:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none dark:bg-slate-900 dark:border-gray-700 dark:text-gray-400 dark:focus:ring-gray-600" />
              </div>

              <div>
                <label htmlFor="message" className="block mb-2 text-sm text-gray-700 font-medium dark:text-white">Message</label>
                <textarea id="message" name="message" rows="4" value={formData.message} onChange={handleChange} className="py-3 px-4 block w-full border-gray-400 rounded-lg text-sm focus:border-blue-500 focus:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none dark:bg-slate-900 dark:border-gray-700 dark:text-gray-400 dark:focus:ring-gray-600"></textarea>
              </div>

              <div className="flex items-center">
                <input id="subscribe" name="subscribe" type="checkbox" checked={formData.subscribe} onChange={handleChange} className="mr-2 border-gray-400 rounded text-blue-600 pointer-events-none focus:ring-blue-500 dark:bg-gray-800 dark:border-gray-700 dark:checked:bg-blue-500 dark:checked:border-blue-500 dark:focus:ring-offset-gray-800" />
                <label htmlFor="subscribe" className="text-sm text-gray-600 dark:text-gray-400">Subscribe to our newsletter</label>
              </div>
            </div>

            <div className="mt-6 grid">
              <button type="submit" className="w-full py-3 px-4 inline-flex justify-center items-center gap-x-2 text-sm font-semibold rounded-lg border border-transparent bg-blue-600 text-white hover:bg-blue-700 disabled:opacity-50 disabled:pointer-events-none dark:focus:outline-none dark:focus:ring-1 dark:focus:ring-gray-600">Send Message</button>
            </div>

            <div className="mt-3 text-center">
              <p className="text-sm text-gray-500">
                We'll get back to you as soon as possible.
              </p>
            </div>
          </form>
        </div>
      </div>
      <Footer />
    </div>
  );
}

export default ContactUs;
