import React, { useContext } from 'react';
import { DatePicker, Input, Radio, Select } from 'antd';
import 'moment/locale/fr';
import locale from 'antd/es/date-picker/locale/fr_FR';

import styles from './Field.module.css';
import { FormContext } from '../../context/FormContext';
import Map from '../map/Map';
import Upload from '../upload/Upload';

const Field = ({ data }) => {
  const { updateForm } = useContext(FormContext);

  const getField = () => {
    switch (data?.type) {
      case 'date':
        const dateFormat = 'DD/MM/YYYY';
        return (
          <DatePicker
            className={styles.date}
            format={dateFormat}
            locale={locale}
            name={data.name}
            onChange={(_, dateString) =>
              updateForm({
                name: data.name,
                order: data.order,
                value: dateString,
              })
            }
          />
        );

      case 'map':
        return (
          <Map
            onChange={(value) => updateForm({ name: data.name, value })}
            placeholder={data.placeholder}
          />
        );

      case 'radio':
        return (
          <Radio.Group
            name={data.name}
            onChange={({ target }) =>
              updateForm({
                name: target.name,
                order: data.order,
                value: target.value,
              })
            }
          >
            {data.values.map((value, index) => (
              <Radio key={index} value={value}>
                {value}
              </Radio>
            ))}
          </Radio.Group>
        );

      case 'select':
        return (
          <Select
            className={styles.select}
            defaultValue=""
            onChange={(value) =>
              updateForm({ name: data.name, order: data.order, value })
            }
          >
            <Select.Option value="">Choisissez une option</Select.Option>
            {data.options.map((option) => (
              <Select.Option key={option} value={option}>
                {option}
              </Select.Option>
            ))}
          </Select>
        );

      case 'textarea':
        return (
          <Input.TextArea
            name={data.name}
            onChange={({ target }) =>
              updateForm({
                name: target.name,
                order: data.order,
                value: target.value,
              })
            }
            placeholder={data.placeholder}
          />
        );

      case 'upload':
        return (
          <Upload
            placeholder={data.placeholder}
            onChange={(value) => updateForm({ name: data.name, value })}
          />
        );

      default:
        return (
          <Input
            name={data?.name}
            onChange={({ target }) =>
              updateForm({
                name: target.name,
                order: data.order,
                value: target.value,
              })
            }
            placeholder={data?.placeholder}
          />
        );
    }
  };

  const field = getField();

  return (
    <div>
      <span className={styles.label}>{data?.name}</span>
      {field}
    </div>
  );
};

export default Field;
