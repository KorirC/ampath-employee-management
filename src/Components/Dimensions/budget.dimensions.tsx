import React from 'react';
import { Select, SelectItem, TextInput, Button, InlineNotification } from 'carbon-components-react';
import { getCounties } from '../../commonResources/common.resource';
import { useState } from 'react';
import styles from './dimensions.module.scss';
import { addBudget } from './dimensions.resource';
import { Formik, Form, FormikHelpers } from 'formik';
import { budgetValues, budgetInputProps } from './dimensions.types';
import { budgetSchema } from './dimensions.validation';

const Budgets: React.FC = () => {
  const [errorCode, setErrorCode] = useState('');
  const [dimensionCreated, setDimensionCreated] = useState<boolean>(false);
  const { data: county } = getCounties();

  const onFormSubmit = (values: budgetInputProps, helpers: FormikHelpers<budgetInputProps>) => {
    console.log(values);
    helpers.setSubmitting(true);
    addBudget(values).then((resp) => {
      if (resp.status === 200) {
        setDimensionCreated(true);
        helpers.resetForm({});
        setErrorCode('');
        console.log('success');
      } else {
        console.log('fail');
        setErrorCode('MFL Code already exists');
      }
    });
  };

  return (
    <>
      {dimensionCreated && <InlineNotification title="Success!" subtitle="Budget Added" kind="success" />}
      {errorCode && <InlineNotification title="Error" subtitle="Budget MFL Code In Use,Try Again" kind="warning" />}
      <Formik validationSchema={budgetSchema} initialValues={budgetValues} onSubmit={onFormSubmit}>
        {({ handleChange, setFieldValue, handleBlur, handleSubmit, values, touched, errors }) => (
          <Form onSubmit={handleSubmit}>
            <TextInput
              name="name"
              id="budget"
              invalid={!!(touched.name && errors.name)}
              invalidText={errors.name}
              labelText="New Budget Name"
              placeholder="Budget Name"
              value={values.name}
              onChange={handleChange}
              onBlur={handleBlur}
            />
            <TextInput
              name="mflCode"
              id="mfl-code"
              invalid={!!(touched.mflCode && errors.mflCode)}
              invalidText={errors.mflCode}
              labelText="New MFL code"
              placeholder="MFL Code"
              value={values.mflCode}
              onChange={handleChange}
              onBlur={handleBlur}
            />
            <Select
              name="county"
              id="county"
              labelText="County: "
              invalid={!!(touched.county && errors.county)}
              invalidText={errors.county}
              onChange={handleChange}
            >
              <SelectItem value={values.county} onChange={handleChange} onBlur={handleBlur} text="Choose Below" />
              {county?.data?.map((item: any, index: any) => (
                <SelectItem text={item.name} key={index} value={item.countyId} />
              ))}
            </Select>
            <Button className={styles.btn} size="default" kind="primary" type="submit">
              Add Budget
            </Button>
            <Button className={styles.btn} size="default" kind="secondary" type="reset">
              Cancel
            </Button>
          </Form>
        )}
      </Formik>
    </>
  );
};
export default Budgets;
