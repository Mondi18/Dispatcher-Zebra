import React, { useState, useEffect, useCallback } from 'react';
import { GoogleMap, Marker, useJsApiLoader } from '@react-google-maps/api';
import { memo } from 'react';
import { db } from '../config/firebase-config';
import { getDocs, collection } from "firebase/firestore";

const containerStyle = {
  width: '800px',
  height: '600px'
};

const budapestCenter = {
  lat: 47.497913,
  lng: 19.040236
};

const Map = () => {
  const [ordersList, setOrdersList] = useState([]);
  const [taxies, setTaxies] = useState([]);
  
  const usersCollectionRef = collection(db, "users");

  useEffect(() => {
    const getOrdersList = async () => {
      try {
        const data = await getDocs(usersCollectionRef);
        const filteredData = data.docs.map(doc => ({
          ...doc.data(),
          name: doc.data().name,
          phone: doc.data().phone,
          joined_at: doc.data().joined_at
        }));

        setOrdersList(filteredData);
        
      } catch (error) {
        console.error(error);
      }
    };
    getOrdersList();
  },[] );
console.log(ordersList);
  useEffect(() => {
    const initialTaxies = generateInitialTaxiPositions();
    setTaxies(initialTaxies);
  }, []);

  const generateInitialTaxiPositions = () => {
    const initialTaxies = [];
    for (let i = 0; i < 10; i++) {
      initialTaxies.push({
        id: i,
        lat: budapestCenter.lat + i * 0.01,
        long: budapestCenter.lng + i * 0.01,
        driverName: `Taxi ${i + 1}`
      });
    }
    return initialTaxies;
  };

  const { isLoaded } = useJsApiLoader({
    id: 'google-map-script',
    googleMapsApiKey: "AIzaSyAcuJfhJG5QPujwXyEtVRUMVnoKm-Xuj5k" // Írd át a saját API kulcsodra
  });

  const onLoad = useCallback(function callback(map) {
    const bounds = new window.google.maps.LatLngBounds(budapestCenter);
    map.fitBounds(bounds);
  }, []);

  return isLoaded ? (
    <div>
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

      <div>
        {ordersList.map(user => (
          
          <div key={user.uuid}>
            <ul>
             <li>{user.phone? user.phone : "Dont have phonenumber"}</li>
            <li>{user.uuid}</li>
            <li>{user.joined_at}</li>
          </ul>
          </div>
        ))}
      </div>
    </div>
  ) : (
    <div>Loading map...</div>
  );
};

export default memo(Map);
