import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { useNavigate } from 'react-router-dom';
import { useUserContext } from '../context/userContext.jsx';
import { FaHome } from 'react-icons/fa';

const LoginForm = () => {
  const navigate = useNavigate();
  const { login, user } = useUserContext();
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  useEffect(() => {
    if (user && user.u_type) {
      console.log("User data updated:", user);
      if (user.u_type === "client") {
        navigate("/ClientPage");
      } else if (user.u_type === "broker") {
        navigate("/Broker");
      } else if (user.u_type === "admin") {
        navigate("/SystemAdmin")
      }
    }
  }, [user]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      // Send a POST request to the backend API for login
      const response = await axios.post("http://localhost:3000/users/login", formData);

      const { token } = response.data;


      console.log("token from backend\n", token);

      // Store the token in local storage
      localStorage.setItem('token', token);

      console.log("login(token): ", token);

      login(token);

      alert("Login successful!");

    } catch (error) {
      console.error(error);
      alert("Login failed. Please check your email and password.");
    }
  };

  return (
    <div className="content-center h-screen w-screen p-4 "
      style={{
        backgroundImage: `url(https://images.pexels.com/photos/259588/pexels-photo-259588.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2)`,
        opacity: 0.8, // Adjust the opacity value as needed (0 to 1)
        backgroundSize: 'cover', // Adjust background size if necessary
        backgroundPosition: 'center', // Adjust background position if necessary
      }}>
      <div className="text-center mt-20 m-10 bg-white p-4 rounded-lg opacity-80">
        <a>Welcome to</a>
        <br />
        <div className="flex items-center justify-center">
          <strong className="text-4xl text-black font-bold">PropertyHub</strong>
          <FaHome className="text-4xl ml-2" />
        </div>
        <br />
      </div>
      <form onSubmit={handleSubmit} className="max-w-md mx-auto p-4 bg-gray-300 rounded-lg shadow-md">
        <div className="mb-4">
          <label htmlFor="email" className="block text-sm font-medium text-gray-600 dark:text-black">Email address</label>
          <input type="email" id="email" name="email" placeholder="example@gmail.com" onChange={handleChange} required className="mt-1 p-2.5 w-full border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" />
        </div>
        <div className="mb-4">
          <label htmlFor="password" className="block text-sm font-medium text-gray-600 dark:text-black">Password</label>
          <input type="password" id="password" name="password" placeholder="•••••••••" onChange={handleChange} required className="mt-1 p-2.5 w-full border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" />
        </div>
        <button type="submit" className="w-full bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 text-white font-medium rounded-lg text-sm py-2.5">Login</button>
      </form>
      <Link to="/CreateAccount" style={{
        display: 'inline-block',
        textAlign: 'center',
        marginTop: '1rem',
        backgroundColor: 'rgba(255, 255, 255, 0.8)', // Adjust the opacity as needed
        padding: '1rem',
        borderRadius: '0.5rem',
      }}><p className="text-center pt-3">Create Account</p></Link>
    </div>
  );
};

export default LoginForm;