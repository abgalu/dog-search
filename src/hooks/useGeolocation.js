import { useEffect, useState } from 'react';
import { Geolocation } from '@capacitor/geolocation';

export const useGeolocation = () => {
  const [currentPosition, setCurrentPosition] = useState({
    lat: 48.8582602,
    lng: 2.2944991,
  });

  useEffect(() => {
    const getCurrentPosition = async () => {
      try {
        const { coords } = await Geolocation.getCurrentPosition();

        if (coords) {
          setCurrentPosition({
            lat: coords.latitude,
            lng: coords.longitude,
          });
        }
      } catch (error) {
        console.error(error.message);
      }
    };

    getCurrentPosition();
  }, []);

  return currentPosition;
};
