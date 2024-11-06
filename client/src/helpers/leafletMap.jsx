// LeafletMap.jsx
import React from 'react';
import { MapContainer, TileLayer, Marker } from 'react-leaflet';
import 'leaflet/dist/leaflet.css'; // Import Leaflet CSS

const LeafletMap = () => {
  const mapOptions = {
    center: [45.4951, -73.5772], // Coordinates for Concordia University, Montreal
    zoom: 16,
    dragging: false,        // Disable map dragging
    scrollWheelZoom: false, // Disable zooming with the scroll wheel
  };

  return (
    <div className="w-full">
      <MapContainer style={{ height: '250px', width: '500px' }} {...mapOptions}>
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution='© OpenStreetMap contributors'
        />
        <Marker position={[45.4951, -73.5772]}>
          {/* You can customize the marker icon or popup here if needed */}
        </Marker>
      </MapContainer>
    </div>
  );
};

export default LeafletMap;

