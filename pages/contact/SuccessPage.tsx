import React from 'react';
import { Link } from 'react-router-dom';

const SuccessPage: React.FC = () => {
  return (
    <div className="flex flex-col items-center justify-center text-center py-20">
      <div className="bg-green-900/50 p-6 rounded-full mb-6">
        <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 text-green-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
        </svg>
      </div>
      <h1 className="text-3xl font-bold text-green-300 mb-4">Message Sent Successfully!</h1>
      <p className="text-gray-300 max-w-lg mb-8">
        Thank you for reaching out. I have received your message and will get back to you as soon as possible.
      </p>
      <Link
        to="/"
        className="bg-purple-600 hover:bg-purple-700 text-white font-bold py-3 px-8 rounded-full transition-all duration-300 transform hover:scale-105"
      >
        &larr; Back to Home
      </Link>
    </div>
  );
};

export default SuccessPage;
