import React, { memo } from 'react';
import firebase from 'firebase/app';

import styles from './App.module.css';
import firebaseConfig from './firebaseConfig';
import Router from './router/Router';

if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig);
} else {
  firebase.app();
}

const App = () => (
  <div className={styles.app}>
    <Router />
  </div>
);

export default memo(App);
