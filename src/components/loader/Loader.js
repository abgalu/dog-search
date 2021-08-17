import React from 'react';
import { Spin } from 'antd';

import styles from './Loader.module.css';

const Loader = () => (
  <div className={styles.loader}>
    Chargement <Spin size="large" />
  </div>
);

export default Loader;
