"use client";
import React from 'react';

const MapCard = () => {
  return (
    <div className="card bg-gray-200" style={{ gridArea: 'map', padding: 0, overflow: 'hidden' }}>
      <iframe
        width="100%"
        height="100%"
        
        src="https://www.openstreetmap.org/export/embed.html?bbox=126.76933274952,37.6033444827267,126.76938274952,37.6033944827267&layer=mapnik&marker=37.6033694827267,126.76935774952"
        style={{ border: 0 }}
      ></iframe>
    </div>
  );
};

export default MapCard;
