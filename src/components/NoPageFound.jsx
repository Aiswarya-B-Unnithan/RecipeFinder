import React from 'react';
import { Link } from 'react-router-dom';
import backgroundImage from '../assets/notFound.jpg'; 
function NoPageFound() {
  return (
    <div
      className="flex flex-col justify-center items-center h-screen bg-cover bg-center"
      style={{ backgroundImage: `url(${backgroundImage})` }}
    >
      <h1 className="text-6xl font-bold text-white mb-4">404</h1>
      <p className="text-2xl text-black mb-4">Page Not Found</p>
      <Link to="/" className="px-4 py-2 bg-blue-500 text-white rounded">
        Go to Home
      </Link>
    </div>
  );
}

export default NoPageFound;
