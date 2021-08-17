import { useEffect, useState } from 'react';
import firebase from 'firebase/app';
import 'firebase/firestore';
import { message } from 'antd';

export const useFirestore = (collection, doc) => {
  const [data, setdata] = useState();
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const getFormFields = async () => {
      setIsLoading(true);

      try {
        const response = await firebase
          .firestore()
          .collection(collection)
          .orderBy('order', 'asc')
          .get();

        if (response.docs) {
          const data = response.docs.map((doc) => ({
            ...doc.data(),
          }));

          setdata(data);
        }
      } catch (error) {
        console.error(error.message);
      }

      setIsLoading(false);
    };

    const getAlerts = async () => {
      setIsLoading(true);

      try {
        const response = await firebase.firestore().collection('alerts').get();

        if (response.docs) {
          const data = response.docs.map((doc) => ({
            docId: doc.id,
            ...doc.data(),
          }));

          setdata(data);
        }
      } catch (error) {
        console.error(error.message);
      }

      setIsLoading(false);
    };

    const getAlert = async () => {
      setIsLoading(true);

      try {
        const response = await firebase
          .firestore()
          .collection('alerts')
          .doc(doc)
          .get();

        setdata(response.data());
      } catch (error) {
        console.error(error.message);
      }

      setIsLoading(false);
    };

    if (collection) {
      if (collection === 'alerts') {
        if (doc) {
          getAlert();
        } else {
          getAlerts();
        }
      } else {
        getFormFields();
      }
    }
  }, [collection, doc]);

  const createAlert = async (payload) => {
    setIsLoading(true);

    try {
      await firebase.firestore().collection('alerts').doc().set(payload);

      message.success('Envoyé avec succès', 1.5);
    } catch (error) {
      message.error('Un problème est survenu. Veuillez réessayer.', 1.5);
    }

    setIsLoading(false);
  };

  return {
    createAlert,
    data,
    isLoading,
  };
};
