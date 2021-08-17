import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from 'antd';

import styles from './GoToHome.module.css';

const GoToHome = () => (
  <Link to="/">
    <Button className={styles.goToHome} type="primary">
      Aller à l'accueil
    </Button>
  </Link>
);

export default GoToHome;
