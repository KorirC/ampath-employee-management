import React from 'react';
import { Select, SelectItem, TextInput, Button, FormLabel, ToastNotification } from 'carbon-components-react';
import { getBudgets, getCounties } from '../../commonResources/common.resource';
import { useEffect, useMemo, useState } from 'react';
import styles from './dimensions.module.scss';
import { addProgram } from './dimensions.resource';
import { useHistory } from 'react-router-dom';
import { Formik, Form, FormikHelpers } from 'formik';
import { programInputProps, programValues } from './dimensions.types';
import { programSchema } from './dimensions.validation';

const Program: React.FC = () => {
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
  console.log(budgets);

  const onFormSubmit = (values: programInputProps, helpers: FormikHelpers<programInputProps>) => {
    console.log(values);
    helpers.setSubmitting(true);
    addProgram(values).then((resp) => {
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
              {budgets.map((item: any, index: any) => (
                <SelectItem text={item.name} key={index} value={item.budgetId} />
              ))}
            </Select>
            <div>
              <Button className={styles.btn} size="default" kind="primary" type="submit">
                Add Program
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
export default Program;
