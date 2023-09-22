import React from 'react';
import { Link } from 'react-router-dom';

const Home = (props) => {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-r from-rose-500 to-purple-600">
      <div className="text-white text-center">
        <h1 className="text-5xl font-bold text-rose-300 mb-8">News Center</h1>
        <p className="text-lg mb-12 text-white">Your source for the latest news and updates</p>
      </div>
      <div className="flex space-x-4">
        <Link
          to="/login"
          className="bg-rose-600 hover:bg-rose-700 text-white font-semibold py-2 px-4 rounded"
        >
          Login
        </Link>
        <Link
          to="/signup"
          className="bg-rose-600 hover:bg-rose-700 text-white font-semibold py-2 px-4 rounded"
        >
          Signup
        </Link>
      </div>
    </div>
  );
}

export default Home;
