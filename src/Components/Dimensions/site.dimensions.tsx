import React from 'react';
import { Select, SelectItem, TextInput, Button, InlineNotification } from 'carbon-components-react';
import { getCounties } from '../../commonResources/common.resource';
import { useState } from 'react';
import styles from './dimensions.module.scss';
import { addSite } from './dimensions.resource';
import { Formik, Form, FormikHelpers } from 'formik';
import { siteInputProps, siteValues } from './dimensions.types';
import { siteSchema } from './dimensions.validation';

const Site: React.FC = () => {
  const [dimensionCreated, setDimensionCreated] = useState<boolean>(false);
  const { data: county } = getCounties();

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
      {dimensionCreated && <InlineNotification title="Success!" subtitle="Site Added" kind="success" />}
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
              {county?.data?.map((item: any, index: any) => (
                <SelectItem text={item.name} key={index} value={item.countyId} />
              ))}
            </Select>
            <div>
              <Button className={styles.btn} size="default" kind="primary" type="submit">
                Add Site
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
export default Site;
