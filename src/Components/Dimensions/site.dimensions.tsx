import React from 'react';
import { Select, SelectItem, TextInput, Button, FormLabel, ToastNotification } from 'carbon-components-react';
import { getBudgets, getCounties } from '../../commonResources/common.resource';
import { useEffect, useMemo, useState } from 'react';
import styles from './dimensions.module.scss';
import { addSite } from './dimensions.resource';
import { useHistory } from 'react-router-dom';
import { Formik, Form, FormikHelpers } from 'formik';
import { siteInputProps, siteValues } from './dimensions.types';
import { siteSchema } from './dimensions.validation';

const Site: React.FC = () => {
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

  const onFormSubmit = (values: siteInputProps, helpers: FormikHelpers<siteInputProps>) => {
    console.log(values);
    helpers.setSubmitting(true);
    addSite(values).then((resp) => {
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
      {dimensionCreated && <ToastNotification title="Success!" timeout={5000} subtitle="Site Added" kind="success" />}
      <Formik validationSchema={siteSchema} initialValues={siteValues} onSubmit={onFormSubmit}>
        {({ handleChange, setFieldValue, handleBlur, handleSubmit, values, touched, errors }) => (
          <Form onSubmit={handleSubmit}>
            <TextInput
              name="name"
              id="site"
              invalid={!!(touched.name && errors.name)}
              invalidText={errors.name}
              labelText="New Site"
              placeholder="Site"
              value={values.name}
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
            <div>
              <Button className={styles.btn} size="default" kind="primary" type="submit">
                Add Site
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
export default Site;
