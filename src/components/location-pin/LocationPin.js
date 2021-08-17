import React from 'react';
import { Popover } from 'antd';
import { AlertTwoTone } from '@ant-design/icons';

import styles from './LocationPin.module.css';

const LocationPin = ({ content }) => {
  const icon = <AlertTwoTone className={styles.icon} twoToneColor="#ff0000" />;

  if (content) {
    return (
      <Popover content={content} trigger="click">
        {icon}
      </Popover>
    );
  }

  return icon;
};

export default LocationPin;
