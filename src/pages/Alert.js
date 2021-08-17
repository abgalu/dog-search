import React from 'react';
import { Card, Image } from 'antd';
import GoogleMapReact from 'google-map-react';
import { useParams } from 'react-router-dom';

import styles from './Alert.module.css';
import Loader from '../components/loader/Loader';
import LocationPin from '../components/location-pin/LocationPin';
import Title from '../components/title/Title';
import { useFirestore } from '../hooks/useFirestore';

const Alert = () => {
  const { doc } = useParams();
  const { data } = useFirestore('alerts', doc);

  if (!data) return <Loader />;

  const { Lieu, Photos, status, ...rest } = data;
  const entries = Object.entries(rest).sort(
    ([, a], [, b]) => a.order - b.order
  );

  return (
    <div className={styles.alert}>
      <Title>Chien {status}</Title>
      <div>
        {entries.map(([key, value]) => (
          <Card hoverable key={key} className={styles.card}>
            <Card.Meta title={key} description={value.value} />
          </Card>
        ))}
      </div>
      <div>
        {Photos.map((photo, index) => (
          <Image key={index} src={photo} width="100%" />
        ))}
      </div>
      <div className={styles.mapContainer}>
        <GoogleMapReact center={Lieu} defaultZoom={12}>
          <LocationPin {...Lieu} />
        </GoogleMapReact>
      </div>
    </div>
  );
};

export default Alert;
