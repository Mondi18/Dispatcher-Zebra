
import React, { useState, useEffect, useCallback } from 'react';
import { GoogleMap, Marker, useJsApiLoader } from '@react-google-maps/api';
import { memo } from 'react';

const containerStyle = {
  width: '800px',
  height: '600px'
};

const budapestCenter = {
  lat: 47.497913,
  lng: 19.040236
};

const Map = () => {
  const [taxies, setTaxies] = useState([]);
  const updateTaxiCoordinates = async (updatedTaxies) => {
    try {
      await fetch("https://localhost:7162/taxi/AddTaxi", {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(
        updatedTaxies
        )
      });
    } catch (error) {
      console.error('Error updating taxi coordinates:', error);
    }
  };
  useEffect(() => {
    const fetchTaxies = async () => {
      try {
        const response = await fetch("https://localhost:7162/taxi/GetAllTaxies");
        if (!response.ok) {
          throw new Error('Failed to fetch taxies');
        }
        const data = await response.json();
        setTaxies(data);
      } catch (error) {
        console.error('Error fetching taxies:', error);
      }
    };
    updateTaxiesRepeatedly();
    fetchTaxies();
  }, []);
  const updateTaxiesRepeatedly = () => {
    setInterval(() => {
      setTaxies(prevTaxies => {
        const updatedTaxies = prevTaxies.map(taxi => {
          const newLat = parseFloat(taxi.lat) + 0.001;
          const newLng = parseFloat(taxi.long) + 0.001;
          return {...taxi,lat: newLat.toString(), long: newLng.toString()};
        });
        updateTaxiCoordinates(updatedTaxies);
        return updatedTaxies;
      });
    }, 10000);
  
  };
  
  const { isLoaded } = useJsApiLoader({
    id: 'google-map-script',
    googleMapsApiKey: "AIzaSyAcuJfhJG5QPujwXyEtVRUMVnoKm-Xuj5k"
  });

  const onLoad = useCallback(function callback(map) {
    const bounds = new window.google.maps.LatLngBounds(budapestCenter);
    map.fitBounds(bounds);
  }, []);

  return isLoaded ? (
    <GoogleMap
      mapContainerStyle={containerStyle}
      center={budapestCenter}
      zoom={15}
      onLoad={onLoad}
    >
      {taxies.map((taxi) => {
        const lat = parseFloat(taxi.lat);
        const lng = parseFloat(taxi.long);

        if (isNaN(lat) || isNaN(lng)) {
          console.warn(`Invalid coordinates for taxi ID ${taxi.id}`);
          return null;
        }

        return (
          <Marker
            key={taxi.id}
            title={taxi.driverName}
            position={{ lat, lng }}
            icon={{
              url: "./taxi.png",
              scaledSize: new window.google.maps.Size(50, 50),
              origin: new window.google.maps.Point(0, 0),
              anchor: new window.google.maps.Point(25, 25)
            }}
          />
        );
      })}
    </GoogleMap>
  ) : (
    <div>Loading map...</div>
  );
};

export default memo(Map);
