import React from 'react';
import { Select, SelectItem, TextInput, Button, FormLabel, ToastNotification } from 'carbon-components-react';
import { getBudgets, getCounties } from '../../commonResources/common.resource';
import { useEffect, useMemo, useState } from 'react';
import styles from './dimensions.module.scss';
import { addCounty } from './dimensions.resource';
import { useHistory } from 'react-router-dom';
import { Formik, Form, FormikHelpers } from 'formik';
import { countyValues, countyInputProps } from './dimensions.types';
import { countySchema } from './dimensions.validation';

const County: React.FC = () => {
  const history = useHistory();
  const [counties, setCounties] = React.useState([]);
  const [budgets, setBudgets] = React.useState([]);
  const [open, setOpen] = useState(true);
  const [dimensionCreated, setDimensionCreated] = useState<boolean>(false);
  const [selectedValues, setSelectedValues] = React.useState({
    budget: '',
    county: '',
  });

  // const handleChange = (e: any) => {
  //   setSelectedValues((current) => ({
  //     ...current,
  //     [e.target.id]: e.target.value,
  //   }));
  // };

  useMemo(async () => {
    await Promise.all([
      getBudgets().then((res) => {
        const results = res.data.map((budget: any) => {
          return {
            ...budget,
            budgets: budget.nFame,
          };
        });
        setBudgets(results);
      }),
      getCounties().then((res) => {
        const results = res.data.map((county: any) => {
          return {
            ...county,
            counties: county.name,
          };
        });
        setCounties(results);
      }),
    ]);
  }, []);

  const onFormSubmit = (values: countyInputProps, helpers: FormikHelpers<countyInputProps>) => {
    console.log(values);
    helpers.setSubmitting(true);
    addCounty(values).then((resp) => {
      if (resp.status === 200) {
        setDimensionCreated(true);
        console.log('success');
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
