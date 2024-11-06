import React from 'react';
import PropertyCard from './PropertyCard';

const PropertyCards = ({ properties }) => {
  const containerStyle = {
    width: '100%', // Set a fixed width for the container
    overflowX: 'auto', // Enable horizontal scrolling
    overflowY: 'hidden',
    display: 'flex', // Use flexbox to align property cards horizontally
    marginTop: '10px', // Add margin to the top
  marginBottom: '10px', // Add margin to the bottom
  };

  const cardContainerStyle = {
    flex: '0 0 auto', // Allow flex items to shrink and grow, but don't allow them to shrink below their initial size
    marginRight: '10px', // Add margin between PropertyCards
  };

  return (
    <div className="flex flex-col items-center flex-wrap mb-10">
      <div style={containerStyle}>
        {properties.map((property) => (
          <div key={property._id} style={cardContainerStyle}>
            <PropertyCard property={property} />
          </div>
        ))}
      </div>
    </div>
  );
};

export default PropertyCards;