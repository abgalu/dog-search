import React, { useState } from 'react';
import GoogleMapReact from 'google-map-react';
import { Button, Modal } from 'antd';

import styles from './Map.module.css';
import { useGeolocation } from '../../hooks/useGeolocation';

const Map = ({ onChange, placeholder }) => {
  const [coordinates, setCoordinates] = useState();
  const [confirmIsVisible, setConfirmIsVisible] = useState(false);
  const [mapIsVisible, setMapIsVisible] = useState(false);
  const [mapSelected, setMapSelected] = useState(false);
  const currentPosition = useGeolocation();

  const getCoordinates = ({ lat, lng }) => {
    setCoordinates({ lat, lng });
    setConfirmIsVisible(true);
  };

  const handleConfirm = () => {
    onChange(coordinates);
    setConfirmIsVisible(false);
    setMapIsVisible(false);
    setMapSelected(true);
  };

  const hideConfirmMessage = () => {
    setConfirmIsVisible(false);
  };

  const hideMap = () => {
    setMapIsVisible(false);
  };

  const showMap = () => {
    setMapIsVisible(true);
  };

  return (
    <>
      <Button
        className={`${styles.button} ${mapSelected && styles.selected}`}
        onClick={showMap}
        type="primary"
      >
        {placeholder}
      </Button>

      <Modal
        bodyStyle={{
          height: '100vh',
          padding: 0,
        }}
        centered
        footer={null}
        onCancel={hideMap}
        visible={mapIsVisible}
      >
        <GoogleMapReact
          center={currentPosition}
          defaultZoom={12}
          onClick={getCoordinates}
        />
      </Modal>

      <Modal
        bodyStyle={{ textAlign: 'center' }}
        cancelText="Annuler"
        centered
        okText="Confirmer"
        onCancel={hideConfirmMessage}
        onOk={handleConfirm}
        visible={confirmIsVisible}
        width={300}
      >
        {/* TO DO */}
        <p>
          <span className={styles.row}>Vous avez choisi :</span>
          <span className={styles.row}>Latitude: {coordinates?.lat}</span>
          <span className={styles.row}>Longitude: {coordinates?.lng}</span>
        </p>
      </Modal>
    </>
  );
};

export default Map;
