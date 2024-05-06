// ContactUs.js

import React, { useState } from 'react';
import Footer from './footer';
import Header from './navbar';

function ContactUs() {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    subject: '',
    message: '',
    subscribe: false,
  });

  const [errors, setErrors] = useState({
    firstName: '',
    lastName: '',
    email: '',
    subject: '',
    message: '',
  });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: type === 'checkbox' ? checked : value,
    }));

    // Reset error for the corresponding field
    if (name === 'firstName') {
      setErrors((prevState) => ({ ...prevState, firstName: '' }));
    } else if (name === 'lastName') {
      setErrors((prevState) => ({ ...prevState, lastName: '' }));
    } else if (name === 'email') {
      setErrors((prevState) => ({ ...prevState, email: '' }));
    } else if (name === 'subject') {
      setErrors((prevState) => ({ ...prevState, subject: '' }));
    } else if (name === 'message') {
      setErrors((prevState) => ({ ...prevState, message: '' }));
    }
  };

  const validateForm = () => {
    let isValid = true;
    const newErrors = {};

    // First name validation
    if (!formData.firstName.trim()) {
      newErrors.firstName = 'First name is required';
      isValid = false;
    } else if (formData.firstName.trim().length < 2) {
      newErrors.firstName = 'First name should be at least 2 characters';
      isValid = false;
    }

    // Last name validation
    if (!formData.lastName.trim()) {
      newErrors.lastName = 'Last name is required';
      isValid = false;
    } else if (formData.lastName.trim().length < 2) {
      newErrors.lastName = 'Last name should be at least 2 characters';
      isValid = false;
    }

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email)) {
      newErrors.email = 'Invalid email address';
      isValid = false;
    }

    // Subject validation
    if (!formData.subject.trim()) {
      newErrors.subject = 'Subject is required';
      isValid = false;
    }

    // Message validation
    if (!formData.message.trim()) {
      newErrors.message = 'Message is required';
      isValid = false;
    }

    setErrors(newErrors);
    return isValid;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (validateForm()) {
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
                  <label
                    htmlFor="first-name"
                    className="block mb-2 text-sm text-gray-700 font-medium dark:text-white"
                  >
                    First Name
                  </label>
                  <input
                    type="text"
                    name="firstName"
                    id="first-name"
                    value={formData.firstName}
                    onChange={handleChange}
                    className={`py-3 px-4 block w-full border-gray-400 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-gray-400 dark:focus:ring-white dark:bg-slate-900 dark:border-gray-700 dark:text-gray-400 dark:focus:ring-gray-600 ${
                      errors.firstName ? 'border-red-500' : ''
                    }`}
                  />
                  {errors.firstName && (
                    <p className="text-red-500 text-sm mt-1">{errors.firstName}</p>
                  )}
                </div>

                <div>
                  <label
                    htmlFor="last-name"
                    className="block mb-2 text-sm text-gray-700 font-medium dark:text-white"
                  >
                    Last Name
                  </label>
                  <input
                    type="text"
                    name="lastName"
                    id="last-name"
                    value={formData.lastName}
                    onChange={handleChange}
                    className={`py-3 px-4 block w-full border-gray-400 rounded-lg text-sm focus:border-blue-500 focus:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none dark:bg-slate-900 dark:border-gray-700 dark:text-gray-400 dark:focus:ring-gray-600 ${
                      errors.lastName ? 'border-red-500' : ''
                    }`}
                  />
                  {errors.lastName && (
                    <p className="text-red-500 text-sm mt-1">{errors.lastName}</p>
                  )}
                </div>
              </div>

              <div>
                <label
                  htmlFor="email"
                  className="block mb-2 text-sm text-gray-700 font-medium dark:text-white"
                >
                  Email
                </label>
                <input
                  type="email"
                  name="email"
                  id="email"
                  value={formData.email}
                  onChange={handleChange}
                  autoComplete="email"
                  className={`py-3 px-4 block w-full border-gray-400 rounded-lg text-sm focus:border-blue-500 focus:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none dark:bg-slate-900 dark:border-gray-700 dark:text-gray-400 dark:focus:ring-gray-600 ${
                    errors.email ? 'border-red-500' : ''
                  }`}
                />
                {errors.email && (
                  <p className="text-red-500 text-sm mt-1">{errors.email}</p>
                )}
              </div>

              <div>
                <label
                  htmlFor="subject"
                  className="block mb-2 text-sm text-gray-700 font-medium dark:text-white"
                >
                  Subject
                </label>
                <input
                  type="text"
                  name="subject"
                  id="subject"
                  value={formData.subject}
                  onChange={handleChange}
                  className={`py-3 px-4 block w-full border-gray-400 rounded-lg text-sm focus:border-blue-500 focus:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none dark:bg-slate-900 dark:border-gray-700 dark:text-gray-400 dark:focus:ring-gray-600 ${
                    errors.subject ? 'border-red-500' : ''
                  }`}
                />
                {errors.subject && (
                  <p className="text-red-500 text-sm mt-1">{errors.subject}</p>
                )}
              </div>

              <div>
                <label
                  htmlFor="message"
                  className="block mb-2 text-sm text-gray-700 font-medium dark:text-white"
                >
                  Message
                </label>
                <textarea
                  name="message"
                  id="message"
                  value={formData.message}
                  onChange={handleChange}
                  rows="4"
                  className={`py-3 px-4 block w-full border-gray-400 rounded-lg text-sm focus:border-blue-500 focus:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none dark:bg-slate-900 dark:border-gray-700 dark:text-gray-400 dark:focus:ring-gray-600 ${
                    errors.message ? 'border-red-500' : ''
                  }`}
                />
                {errors.message && (
                  <p className="text-red-500 text-sm mt-1">{errors.message}</p>
                )}
              </div>
            </div>

            <div className="mt-6">
              <button
                type="submit"
                className="bg-blue-500 text-white py-3 px-6 rounded-lg hover:bg-blue-600 transition-colors duration-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                Submit
              </button>
            </div>
          </form>
        </div>
      </div>
      <Footer />
    </div>
  );
}

export default ContactUs;