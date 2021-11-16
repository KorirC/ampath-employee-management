import React from 'react';
import { TextInput, Button, ToastNotification } from 'carbon-components-react';
import { useState } from 'react';
import styles from './dimensions.module.scss';
import { addCounty } from './dimensions.resource';
import { Formik, Form, FormikHelpers } from 'formik';
import { countyValues, countyInputProps } from './dimensions.types';
import { countySchema } from './dimensions.validation';

const County: React.FC = () => {
  const [dimensionCreated, setDimensionCreated] = useState<boolean>(false);

  const onFormSubmit = (values: countyInputProps, helpers: FormikHelpers<countyInputProps>) => {
    console.log(values);
    helpers.setSubmitting(true);
    addCounty(values).then((resp) => {
      if (resp.status === 200) {
        setDimensionCreated(true);
        console.log('success');
        helpers.resetForm({});
      } else {
        console.log('fail');
      }
    });
  };

  return (
    <>
      {dimensionCreated && <ToastNotification title="Success!" timeout={5000} subtitle="County Added" kind="success" />}
      <Formik validationSchema={countySchema} initialValues={countyValues} onSubmit={onFormSubmit}>
        {({ handleChange, setFieldValue, handleBlur, handleSubmit, values, touched, errors }) => (
          <Form onSubmit={handleSubmit}>
            <TextInput
              name="name"
              id="county"
              invalid={!!(touched.name && errors.name)}
              invalidText={errors.name}
              labelText="New county"
              placeholder="County Name"
              value={values.name}
              onChange={handleChange}
              onBlur={handleBlur}
            />
            <TextInput
              name="countyId"
              id="countyid"
              invalid={!!(touched.countyId && errors.countyId)}
              invalidText={errors.countyId}
              labelText="New County Id"
              placeholder="County Id"
              value={values.countyId}
              onChange={handleChange}
              onBlur={handleBlur}
            />
            <div>
              <Button className={styles.btn} size="default" kind="primary" type="submit">
                Add County
              </Button>
              <Button className={styles.btn} size="default" kind="secondary">
                Cancel
              </Button>
            </div>
          </Form>
        )}
      </Formik>
    </>
  );
};
export default County;
