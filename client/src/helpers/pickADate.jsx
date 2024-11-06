import React, { useState } from 'react';

const PickADate = ({ onSubmit }) => {
  const [selectedDate, setSelectedDate] = useState(new Date());

  const handleDateChange = (event) => {
    setSelectedDate(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    onSubmit(selectedDate); // Invoke the onSubmit function with selectedDate as an argument
  };

  return (
    <div className="bg-white p-4 rounded-lg m-3">
      <h2>Select a Date:</h2>
      <form onSubmit={handleSubmit}>
        <input type="datetime-local" value={selectedDate} onChange={handleDateChange} />
        <button className="bg-green-500 hover:bg-white text-white hover:text-green-500 px-4 py-2 rounded transition duration-300 ease-in-out ml-3 my-2" type="submit">Submit</button>
      </form>
    </div>
  );
};

export default PickADate;

