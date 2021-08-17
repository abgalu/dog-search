import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import 'firebase/auth';

import { useFirestore } from '../hooks/useFirestore';

export const FormContext = React.createContext({});

const FormProvider = ({ children }) => {
  const [formValues, setFormValues] = useState({});
  const { createAlert } = useFirestore('alerts');
  const history = useHistory();

  const updateForm = ({ name, order, value }) => {
    setFormValues((prevState) => {
      if (order) {
        return {
          ...prevState,
          [name]: {
            order,
            value,
          },
        };
      }

      return {
        ...prevState,
        [name]: value,
      };
    });
  };

  const formContext = {
    formValues,
    resetForm: () => setFormValues({}),
    submitForm: (uid) => {
      createAlert({ ...formValues, uid });
      history.push('/alerts');
    },
    updateForm,
  };

  return (
    <FormContext.Provider value={formContext}>{children}</FormContext.Provider>
  );
};

export default FormProvider;
