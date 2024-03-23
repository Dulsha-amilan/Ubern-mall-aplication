import React from 'react';
import Header from './navbar';
import Footer from './footer';

const AboutUs = () => {
  return (
    <div className="bg-gray-100">
    <Header />
      {/* Hero Section */}
      <div className="bg-indigo-700 py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-4xl font-bold text-white text-center">Welcome to Urban Mall</h1>
          <p className="mt-4 max-w-3xl mx-auto text-xl text-gray-300 text-center">
            Experience the ultimate shopping and entertainment destination in the heart of the city.
          </p>
        </div>
      </div>

      {/* About Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="lg:text-center">
          <h2 className="text-base text-indigo-600 font-semibold tracking-wide uppercase">About Urban Mall</h2>
          <p className="mt-2 text-3xl leading-8 font-extrabold tracking-tight text-gray-900 sm:text-4xl">
            A Shopping Destination Like No Other
          </p>
          <p className="mt-4 max-w-2xl text-xl text-gray-500 lg:mx-auto">
            Urban Mall is a premier shopping destination that offers a unique and unforgettable experience for all visitors.
          </p>
        </div>

        <div className="mt-10">
          <dl className="space-y-10 md:space-y-0 md:grid md:grid-cols-2 md:gap-x-8 md:gap-y-10">
            <div className="relative">
              <dt>
                <div className="absolute flex items-center justify-center h-12 w-12 rounded-md bg-indigo-500 text-white">
                  <svg className="h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
                  </svg>
                </div>
                <p className="ml-16 text-lg leading-6 font-medium text-gray-900">Shopping Experience</p>
              </dt>
              <dd className="mt-2 ml-16 text-base text-gray-500">
                With over 200 stores and a diverse range of products, Urban Mall offers an exceptional shopping experience for everyone. From high-end fashion boutiques to trendy lifestyle stores, you'll find everything you need under one roof.
              </dd>
            </div>

            {/* Add more features here */}
          </dl>
        </div>
      </div>

      {/* Gallery Section */}
      <div className="bg-gray-800 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-extrabold text-white text-center">Gallery</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 mt-8">
            <img src="https://via.placeholder.com/500x350" alt="Gallery" className="rounded-lg" />
            <img src="https://via.placeholder.com/500x350" alt="Gallery" className="rounded-lg" />
            <img src="https://via.placeholder.com/500x350" alt="Gallery" className="rounded-lg" />
            <img src="https://via.placeholder.com/500x350" alt="Gallery" className="rounded-lg" />
            {/* Add more gallery images here */}
          </div>
        </div>
      </div>

      {/* Testimonials Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <h2 className="text-3xl font-extrabold text-gray-900 text-center">What Our Customers Say</h2>
        <div className="mt-8 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          <blockquote className="bg-white rounded-lg shadow-lg p-6">
            <p className="text-gray-600">"Urban Mall is my go-to destination for shopping and entertainment. The variety of stores and the vibrant atmosphere make it a truly unique experience."</p>
            <footer className="mt-4">
              <p className="text-gray-900 font-semibold">John Doe</p>
              <p className="text-gray-600">Customer</p>
            </footer>
          </blockquote>
          {/* Add more testimonials here */}
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default AboutUs;