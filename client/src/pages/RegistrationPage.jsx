import React, { useState } from "react";
import { Link } from "react-router-dom";
import ClientRegistrationForm from "../components/ClientRegistrationForm";
import BrokerRegistrationForm from "../components/BrokerRegistrationForm";

const RegistrationPage = () => {
  const [isClientFormVisible, setClientFormVisible] = useState(true);

  const toggleForm = () => {
    setClientFormVisible(!isClientFormVisible);
  };

  return (
    <div>
    <div>
      <h1 className="text-center pt-2">Create Account</h1>
      {isClientFormVisible ? (
        <div>
          <ClientRegistrationForm />
        </div>
      ) : (
        <div>
          <BrokerRegistrationForm />
        </div>
      )}
    <div className="flex justify-center">
  <button className="bg-gray-700 hover:bg-gray-800 focus:ring-4 focus:outline-none focus:ring-blue-300 text-white font-medium rounded-lg text-sm py-2.5 px-3" onClick={toggleForm}>
    {isClientFormVisible ? "Switch to Broker Registration" : "Switch to Client Registration"}
  </button>
</div>
      <Link to="/"><p className="text-center pt-2">Already have an account?</p></Link>
    </div>
    </div>
  );
};

export default RegistrationPage;
