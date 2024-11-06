import React, { useState, useEffect } from "react";
import axios from "axios";
import SearchBar from "../components/searchBar";
import PropertyCards from "../components/PropertyCards"; 
import HeaderNav from "../components/HeaderNav";
import Footer from "../components/Footer";

const PropertyFilter = () => {
  const [properties, setProperties] = useState([]);
  const [filteredProperties, setFilteredProperties] = useState([]);
  const [loading, setLoading] = useState(true);


  //Retrieve Properties from database
  useEffect(() => {
    setLoading(true);
    axios
      .get("http://localhost:3000/properties")
      .then((response) => {
        setProperties(response.data);
        setLoading(false);
      })
      .catch((error) => {
        console.error(error);
        setLoading(false);
      });
  }, []); 


  //Based on searchBar parameters, filter the properties data from the database
  const handleSearch = (searchParams) => {
    const filteredResults = properties.filter((property) => {
      return (
       (!searchParams.postal_code || property.address.postal_code.toLowerCase().trim().includes(searchParams.postal_code.toLowerCase().trim())) &&
      (!searchParams.province || property.address.province.includes(searchParams.province)) &&
      (!searchParams.bedrooms || property.bedrooms.toString().includes(searchParams.bedrooms)) &&
      (!searchParams.bathrooms || property.bathrooms.toString().includes(searchParams.bathrooms)) &&
      (!searchParams.h_type || property.h_type.includes(searchParams.h_type)) &&
      (!searchParams.s_type || property.s_type.includes(searchParams.s_type))
    );
  });

    //Set filtered properties as the results from filtering 
    setFilteredProperties(filteredResults);
  };


  //Return: connect searchBar and PropertyCards 
  return (
    <div>
      <HeaderNav/>
      <SearchBar onSearch={handleSearch} /> 
      <PropertyCards properties={filteredProperties} />
      <Footer/>
    </div>
  );
};

export default PropertyFilter;
