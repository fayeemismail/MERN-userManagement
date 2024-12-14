import React from 'react';

const About = () => {
  return (
    <div className="bg-gray-100 min-h-screen flex flex-col items-center justify-center text-center">
      <div className="bg-white shadow-md rounded-lg p-8 w-full max-w-2xl">
        <h1 className="text-4xl font-bold text-green-950 mb-6">About Us</h1>
        <p className="text-gray-700 text-lg mb-4">
          Welcome to our MERN application! We aim to provide seamless and user-friendly experiences 
          for managing and exploring your data. Our team is dedicated to crafting high-quality 
          solutions using the latest technologies in web development.
        </p>
        <p className="text-gray-700 text-lg mb-4">
          This application is built with the MERN stack:
        </p>
        <ul className="list-disc list-inside text-gray-700 text-lg mb-6">
          <li><strong>MongoDB:</strong> A powerful NoSQL database for storing your data.</li>
          <li><strong>Express:</strong> A flexible Node.js web application framework.</li>
          <li><strong>React:</strong> A modern JavaScript library for building user interfaces.</li>
          <li><strong>Node.js:</strong> A runtime environment for executing JavaScript on the server side.</li>
        </ul>
        <p className="text-gray-700 text-lg mb-6">
          Our mission is to deliver a robust and secure platform that meets the evolving needs of our users. 
          We value feedback and encourage you to reach out with any suggestions or questions.
        </p>
        <footer className="text-gray-500 mt-10">
          <p>&copy; {new Date().getFullYear()} Your MERN App. All rights reserved.</p>
        </footer>
      </div>
    </div>
  );
};

export default About;
