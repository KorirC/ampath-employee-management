import React from 'react';
import { TextInput, Button, ToastNotification } from 'carbon-components-react';
import { useState } from 'react';
import styles from './dimensions.module.scss';
import { addDepartment } from './dimensions.resource';
import { Formik, Form, FormikHelpers } from 'formik';
import { departmentInputProps, departmentValues } from './dimensions.types';
import { departmentSchema } from './dimensions.validation';

const Department: React.FC = () => {
  const [dimensionCreated, setDimensionCreated] = useState<boolean>(false);

  const onFormSubmit = (values: departmentInputProps, helpers: FormikHelpers<departmentInputProps>) => {
    console.log(values);
    helpers.setSubmitting(true);
    addDepartment(values).then((resp) => {
      if (resp.status === 200) {
        setDimensionCreated(true);
        helpers.resetForm({});
        console.log('success');
      } else {
        console.log('fail');
      }
    });
  };

  return (
    <>
      {dimensionCreated && (
        <ToastNotification title="Success!" timeout={5000} subtitle="Department Added" kind="success" />
      )}
      <Formik validationSchema={departmentSchema} initialValues={departmentValues} onSubmit={onFormSubmit}>
        {({ handleChange, setFieldValue, handleBlur, handleSubmit, values, touched, errors }) => (
          <Form onSubmit={handleSubmit}>
            <TextInput
              name="name"
              id="department"
              invalid={!!(touched.name && errors.name)}
              invalidText={errors.name}
              labelText="New Department"
              placeholder="Department Name"
              value={values.name}
              onChange={handleChange}
              onBlur={handleBlur}
            />
            <div>
              <Button className={styles.btn} size="default" kind="primary" type="submit">
                Add Department
              </Button>
              <Button className={styles.btn} size="default" kind="secondary" type="reset">
                Cancel
              </Button>
            </div>
          </Form>
        )}
      </Formik>
    </>
  );
};
export default Department;
