import React, { useContext, useState } from 'react';
import firebase from 'firebase/app';
import 'firebase/auth';
import { Button, Modal } from 'antd';

import Login from '../../pages/Login';
import { FormContext } from '../../context/FormContext';

const ModalFooter = ({ disabled, hideModal, next, prev, step, steps }) => {
  const [loginIsVisible, setLoginIsVisible] = useState(false);
  const { submitForm } = useContext(FormContext);
  const user = firebase.auth().currentUser;

  const handleSubmit = () => {
    if (user) {
      submitForm(user.uid);
      hideModal();
    } else {
      setLoginIsVisible(true);
    }
  };

  return (
    <div className="steps-action">
      {step > 1 && <Button onClick={prev}>Revenir</Button>}

      {step < steps.length && (
        <Button disabled={disabled} onClick={next} type="primary">
          Continuer
        </Button>
      )}

      {step === steps.length && (
        <Button disabled={disabled} onClick={handleSubmit} type="primary">
          Envoyer
        </Button>
      )}

      <Modal
        centered
        footer={null}
        onCancel={() => setLoginIsVisible(false)}
        visible={loginIsVisible}
      >
        <Login />
      </Modal>
    </div>
  );
};

export default ModalFooter;
