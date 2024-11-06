import React, { useState } from 'react';

const SearchBar = ({ onSearch }) => {
  const [searchParams, setSearchParams] = useState({
    postal_code: '',
    province: '',
    bedrooms: '',
    bathrooms: '',
    h_type: '',
    s_type: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setSearchParams((prevSearchParams) => ({
      ...prevSearchParams,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSearch(searchParams);
  };

  return (
    <div className="max-w-screen-xl mx-auto border-gray-300 py-2 px-2 flex flex-wrap gap-2 justify-center items-center bg-white shadow-lg rounded-lg">
    <input
        type="text"
        className="border p-2 rounded"
        placeholder="Postal Code"
        name="postal_code"
        value={searchParams.postal_code}
        onChange={handleChange}
      />
      <select
        className="border p-2 rounded"
        name="province"
        value={searchParams.province}
        onChange={handleChange}
      >
        <option value="">Select Province</option>
        <option value="Alberta">AB</option>
        <option value="British Columbia">BC</option>
        <option value="Manitoba">MB</option>
        <option value="New Brunswick">NB</option>
        <option value="Newfoundland and Labrador">NL</option>
        <option value="Nova Scotia">NS</option>
        <option value="Ontario">ON</option>
        <option value="Prince Edward Island">PE</option>
        <option value="Quebec">QC</option>
        <option value="Saskatchewan">SK</option>
        <option value="Other">Other</option>
      </select>
      <select
        className="border p-2 rounded"
        name="bedrooms"
        value={searchParams.bedrooms}
        onChange={handleChange}
      >
        <option value="">Any Bedrooms</option>
        <option value="1">1 Bedroom</option>
        <option value="2">2 Bedrooms</option>
        <option value="3">3 Bedrooms</option>
        <option value="4">4 Bedrooms</option>
        <option value="5">5+ Bedrooms</option>
      </select>
      <select
        className="border p-2 rounded"
        name="bathrooms"
        value={searchParams.bathrooms}
        onChange={handleChange}
      >
        <option value="">Any Bathrooms</option>
        <option value="1">1 Bathroom</option>
        <option value="2">2 Bathrooms</option>
        <option value="3">3 Bathrooms</option>
        <option value="4">4+ Bathrooms</option>
      </select>
      <select
        className="border p-2 rounded"
        name="h_type"
        value={searchParams.h_type}
        onChange={handleChange}
      >
        <option value="">Home Type</option>
        <option value="Apartment">Apartment</option>
        <option value="House">House</option>
        <option value="Condo">Condo</option>
        <option value="Duplex">Duplex</option>
        <option value="Studio">Studio</option>
        <option value="Loft">Loft</option>
      </select>
      <select
        className="border p-2 rounded"
        name="s_type"
        value={searchParams.s_type}
        onChange={handleChange}
      >
        <option value="">Sale Type</option>
        <option value="sale">For Sale</option>
        <option value="rent">For Rent</option>
      </select>
      <button
        className="border p-2 rounded bg-blue-500 text-white hover:bg-white hover:text-blue-500 transition duration-300"
        onClick={handleSubmit}
      >
        Search
      </button>
    </div>
  );
};

export default SearchBar;
