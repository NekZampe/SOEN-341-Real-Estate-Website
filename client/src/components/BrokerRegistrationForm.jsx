import React, { useState } from "react";
import axios from "axios";

const BrokerRegistrationForm = () => {
  const [formData, setFormData] = useState({
   
    name: "",
    email: "",
    password: "",
    u_type: "broker",
    contact: {
      authorization: "",
      phone: "",
      company: "",
    },
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name.includes("contact.")) {
      // If the field is nested under contact, update contact object
      const contactField = name.split(".")[1];
      setFormData((prevData) => ({
        ...prevData,
        contact: {
          ...prevData.contact,
          [contactField]: value,
        },
      }));
    } else {
      // If the field is not nested under contact, update directly
      setFormData((prevData) => ({
        ...prevData,
        [name]: value,
      }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
  
      const { name, email, password, u_type, contact} = formData; // Destructure form data
      console.log(formData);
      // Send a POST request to the backend API for broker registration
      await axios.post("http://localhost:3000/users/broker/register", {
        name,
        email,
        password,
        u_type,
        contact,
      });
      alert("Broker registration successful!");

    } catch (error) {
      console.error(error);
      alert("Broker registration failed. Please try again.");
    }
  };

  return (
    <div className="content-center max-w-md mx-auto p-4">
      <h2 className="text-center text-2xl font-semibold mb-4">Broker</h2>
      <form onSubmit={handleSubmit} className="max-w-md mx-auto p-4 bg-gray-300 rounded-lg shadow-md">
        <input
          type="text"
          name= "name"
          placeholder="Name"
          onChange={handleChange}
          required
          className="mt-2 p-2.5 w-full border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
        />
        <input
          type="email"
          name="email"
          placeholder="Email"
          onChange={handleChange}
          required
          className="mt-2 p-2.5 w-full border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
        />
        <input
          type="password"
          name="password"
          placeholder="Password"
          onChange={handleChange}
          required
          className="mt-2 p-2.5 w-full border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
        />
        <input
          type="text"
          name="contact.authorization"
          placeholder="Authorization Code"
          onChange={handleChange}
          required
          className="mt-2 p-2.5 w-full border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
        />
        <input
          type="text"
          name="contact.phone"
          placeholder="Phone"
          onChange={handleChange}
          required
          className="mt-2 p-2.5 w-full border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
        />
        <input
          type="text"
          name="contact.company"
          placeholder="Company"
          onChange={handleChange}
          required
          className="mt-2 p-2.5 w-full border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
        />
        <button
          type="submit"
          className="mt-4 w-full bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 text-white font-medium rounded-lg text-sm py-2.5"
        >
          Register as Broker
        </button>
      </form>
    </div>
  );
  
};

export default BrokerRegistrationForm;
