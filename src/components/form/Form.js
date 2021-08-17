import React from 'react';
import { Progress } from 'antd';

import styles from './Form.module.css';
import Field from '../field/Field';
import Loader from '../loader/Loader';
import Title from '../title/Title';

const Form = ({ isLoading, steps, step, title }) => {
  if (isLoading) return <Loader />;

  return (
    <div>
      <Title>{title}</Title>
      <div className={styles.row}>
        <Progress
          percent={(step * 100) / steps?.length}
          showInfo={false}
          size="small"
          status="active"
        />
      </div>
      <Field data={steps?.[step - 1]} />
    </div>
  );
};

export default Form;
