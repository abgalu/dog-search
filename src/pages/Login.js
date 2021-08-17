import React, { useContext } from 'react';
import firebase from 'firebase/app';
import 'firebase/auth';
import StyledFirebaseAuth from 'react-firebaseui/StyledFirebaseAuth';

import Title from '../components/title/Title';
import { FormContext } from '../context/FormContext';

const Login = () => {
  const { submitForm } = useContext(FormContext);

  const uiConfig = {
    callbacks: {
      signInSuccessWithAuthResult: (authResult) => {
        const { user } = authResult;

        if (user) submitForm(user.uid);
      },
    },
    signInFlow: 'popup',
    signInOptions: [firebase.auth.GoogleAuthProvider.PROVIDER_ID],
    signInSuccessUrl: '/alerts',
  };

  return (
    <div>
      <Title>Se connecter</Title>
      <StyledFirebaseAuth uiConfig={uiConfig} firebaseAuth={firebase.auth()} />
    </div>
  );
};

export default Login;
