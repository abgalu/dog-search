import React, { useState } from 'react';
import { Camera, CameraResultType } from '@capacitor/camera';
import { defineCustomElements } from '@ionic/pwa-elements/loader';
import { Button, Image } from 'antd';

import styles from './Upload.module.css';

const Upload = ({ onChange, placeholder }) => {
  const [imageList, setImageList] = useState([]);

  defineCustomElements(window);

  const takePicture = async () => {
    try {
      const image = await Camera.getPhoto({
        quality: 90,
        allowEditing: false,
        resultType: CameraResultType.Base64,
      });

      if (image) {
        const newImageList = [
          ...imageList,
          `data:image/${image.format};base64,${image.base64String}`,
        ];

        setImageList(newImageList);
        onChange(newImageList);
      }
    } catch (error) {
      console.error(error.message);
    }
  };

  return (
    <>
      <Button
        className={`${styles.button} ${imageList.length && styles.selected}`}
        onClick={takePicture}
        type="primary"
      >
        {placeholder}
      </Button>

      {imageList.length > 0 && (
        <div className={styles.imageBlock}>
          {imageList.map((image, index) => (
            <Image key={index} src={image} width="100%" />
          ))}
        </div>
      )}
    </>
  );
};

export default Upload;
