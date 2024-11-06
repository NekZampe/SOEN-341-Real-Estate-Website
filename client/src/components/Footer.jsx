import React from 'react';

const Footer = () => {
  return (
    <footer className="mt-10 bg-gradient-to-b from-white-900 via-gray-700 to-gray-600 text-gray py-8 w-full">
      <div className="container mx-auto flex justify-between px-5">
        <div className="text-left">
          <h3 className="text-lg font-semibold mb-2">Developers</h3>
          <ul>
            <li>Nektarios Zampetoulakis</li>
            <li>Ryad Alla</li>
            <li>Mark Tadros</li>
            <li>Sager Balasubramaniam</li>
            <li>Nathanial Hwong</li>
          </ul>
        </div>
        <div className="text-right">
  <h3 className="text-lg font-semibold mb-2">Technologies</h3>
  <ul>
    <li><span className="font-bold">M</span>ongoDB</li>
    <li><span className="font-bold">E</span>xpress.JS</li>
    <li><span className="font-bold">R</span>eact</li>
    <li><span className="font-bold">N</span>ode.JS</li>
  </ul>
</div>
      </div>
      <div className="text-center mt-4">
        <p>&copy; 2023 BATHZ. All rights reserved.</p>
      </div>
    </footer>
  );
};

export default Footer;
