import React, { useContext, useState } from 'react';
import { Link } from 'react-router-dom';
import { Button, Modal } from 'antd';

import styles from './Home.module.css';
import Form from '../components/form/Form';
import ModalFooter from '../components/modal-footer/ModalFooter';
import { FormContext } from '../context/FormContext';
import { useFirestore } from '../hooks/useFirestore';

const Home = () => {
  const { formValues, resetForm, updateForm } = useContext(FormContext);
  const [collection, setCollection] = useState('');
  const [step, setStep] = useState(1);
  const [title, setTitle] = useState('');
  const [visible, setVisible] = useState(false);
  const { data, isLoading } = useFirestore(collection);

  const getDogFoundForm = () => {
    setCollection('dog-found-form');
    setTitle("J'ai trouvé un chien");
    updateForm({
      name: 'status',
      value: 'trouvé',
    });
  };

  const getLostDogForm = () => {
    setCollection('lost-dog-form');
    setTitle("J'ai perdu mon chien");
    updateForm({
      name: 'status',
      value: 'perdu',
    });
  };

  const hideModal = () => {
    setVisible(false);
    setCollection('');
    setStep(1);
    setTitle('');
    resetForm({});
  };

  const next = () => {
    setStep((prevState) => prevState + 1);
  };

  const prev = () => {
    setStep((prevState) => prevState - 1);
  };

  return (
    <div className={styles.home}>
      <Button
        className={styles.button}
        onClick={() => {
          getLostDogForm();
          setVisible(true);
        }}
        type="primary"
      >
        J'ai perdu mon chien
      </Button>

      <Button
        className={styles.button}
        onClick={() => {
          getDogFoundForm();
          setVisible(true);
        }}
        type="primary"
      >
        J'ai trouvé un chien
      </Button>

      <Link to="alerts">
        <Button className={styles.button} type="primary">
          Voir les alertes
        </Button>
      </Link>

      <Modal
        centered
        footer={
          data ? (
            <ModalFooter
              disabled={
                data?.[step - 1].required && !formValues[data?.[step - 1].name]
              }
              hideModal={hideModal}
              next={next}
              prev={prev}
              step={step}
              steps={data}
            />
          ) : null
        }
        onCancel={hideModal}
        visible={visible}
      >
        <Form isLoading={isLoading} step={step} steps={data} title={title} />
      </Modal>
    </div>
  );
};

export default Home;
