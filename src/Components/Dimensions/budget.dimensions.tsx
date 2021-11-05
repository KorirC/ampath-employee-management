import React from 'react';
import { Select, SelectItem, TextInput, Button, FormLabel, ToastNotification } from 'carbon-components-react';
import { getBudgets, getCounties } from '../../commonResources/common.resource';
import { useEffect, useMemo, useState } from 'react';
import styles from './dimensions.module.scss';
import { addBudget } from './dimensions.resource';
import { useHistory } from 'react-router-dom';
import { Formik, Form, FormikHelpers } from 'formik';
import { budgetValues, budgetInputProps } from './dimensions.types';
import { budgetSchema } from './dimensions.validation';

const Budgets: React.FC = () => {
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

  const onFormSubmit = (values: budgetInputProps, helpers: FormikHelpers<budgetInputProps>) => {
    console.log(values);
    helpers.setSubmitting(true);
    addBudget(values).then((resp) => {
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
      {dimensionCreated && <ToastNotification title="Success!" timeout={5000} subtitle="Budget Added" kind="success" />}
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
              {counties.map((item: any, index: any) => (
                <SelectItem text={item.name} key={index} value={item.countyId} />
              ))}
            </Select>
            <Button className={styles.btn} size="default" kind="primary" type="submit">
              Add Budget
            </Button>
            <Button className={styles.btn} size="default" kind="secondary">
              Cancel
            </Button>
          </Form>
        )}
      </Formik>
    </>
  );
};
export default Budgets;
