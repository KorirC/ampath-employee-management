import React from 'react';
import { Select, SelectItem, TextInput, Button, ToastNotification } from 'carbon-components-react';
import { getBudgets } from '../../commonResources/common.resource';
import { useState } from 'react';
import styles from './dimensions.module.scss';
import { addProgram } from './dimensions.resource';
import { Formik, Form, FormikHelpers } from 'formik';
import { programInputProps, programValues } from './dimensions.types';
import { programSchema } from './dimensions.validation';

const Program: React.FC = () => {
  const [dimensionCreated, setDimensionCreated] = useState<boolean>(false);
  const { data: budget } = getBudgets();

  const onFormSubmit = (values: programInputProps, helpers: FormikHelpers<programInputProps>) => {
    console.log(values);
    helpers.setSubmitting(true);
    addProgram(values).then((resp) => {
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
      {dimensionCreated && (
        <ToastNotification title="Success!" timeout={5000} subtitle="Program Added" kind="success" />
      )}
      <Formik validationSchema={programSchema} initialValues={programValues} onSubmit={onFormSubmit}>
        {({ handleChange, setFieldValue, handleBlur, handleSubmit, values, touched, errors }) => (
          <Form onSubmit={handleSubmit}>
            <TextInput
              name="name"
              id="programs"
              invalid={!!(touched.name && errors.name)}
              invalidText={errors.name}
              labelText="New Program"
              placeholder="Program"
              value={values.name}
              onChange={handleChange}
              onBlur={handleBlur}
            />
            <Select
              name="budget"
              id="budget"
              labelText="Budget: "
              invalid={!!(touched.budget && errors.budget)}
              invalidText={errors.budget}
              onChange={handleChange}
            >
              <SelectItem value={values.budget} onChange={handleChange} onBlur={handleBlur} text="Choose Below" />
              {budget?.data?.map((item: any, index: any) => (
                <SelectItem text={item.name} key={index} value={item.budgetId} />
              ))}
            </Select>
            <div>
              <Button className={styles.btn} size="default" kind="primary" type="submit">
                Add Program
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
export default Program;
