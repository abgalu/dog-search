import React from 'react';
import { Link } from 'react-router-dom';
import GoogleMapReact from 'google-map-react';
import { Button } from 'antd';

import styles from './Alerts.module.css';
import GoToHome from '../components/go-to-home/GoToHome';
import LocationPin from '../components/location-pin/LocationPin';
import { useFirestore } from '../hooks/useFirestore';
import { useGeolocation } from '../hooks/useGeolocation';

const Alerts = () => {
  const { data } = useFirestore('alerts');
  const currentPosition = useGeolocation();

  return (
    <div className={styles.alerts}>
      <GoogleMapReact center={currentPosition} defaultZoom={12}>
        {data?.map((alert) => {
          // TO DO
          const content = (
            <div>
              <p>
                Chien {alert.status} le {alert.Date?.value}
              </p>
              <Link to={`/alert/${alert.docId}`}>
                <Button className={styles.button} type="primary">
                  Aller au détail
                </Button>
              </Link>
            </div>
          );

          return (
            <LocationPin content={content} key={alert.docId} {...alert.Lieu} />
          );
        })}
      </GoogleMapReact>
      <GoToHome />
    </div>
  );
};

export default Alerts;
