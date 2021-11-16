import React from 'react';
import { TextInput, Button, ToastNotification } from 'carbon-components-react';
import { useState } from 'react';
import styles from './dimensions.module.scss';
import { addProject } from './dimensions.resource';
import { Formik, Form, FormikHelpers } from 'formik';
import { projectInputProps, projectValues } from './dimensions.types';
import { projectSchema } from './dimensions.validation';

const Project: React.FC = () => {
  const [dimensionCreated, setDimensionCreated] = useState<boolean>(false);

  const onFormSubmit = (values: projectInputProps, helpers: FormikHelpers<projectInputProps>) => {
    console.log(values);
    helpers.setSubmitting(true);
    addProject(values).then((resp) => {
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
        <ToastNotification title="Success!" timeout={5000} subtitle="Project Added" kind="success" />
      )}
      <Formik validationSchema={projectSchema} initialValues={projectValues} onSubmit={onFormSubmit}>
        {({ handleChange, setFieldValue, handleBlur, handleSubmit, values, touched, errors }) => (
          <Form onSubmit={handleSubmit}>
            <TextInput
              name="name"
              id="projects"
              data-testid="projects"
              invalid={!!(touched.name && errors.name)}
              invalidText={errors.name}
              labelText="New Project Name"
              placeholder="Project Name"
              value={values.name}
              onChange={handleChange}
              onBlur={handleBlur}
            />
            <div>
              <Button className={styles.btn} size="default" kind="primary" type="submit" data-testid="add">
                Add Project
              </Button>
              <Button className={styles.btn} size="default" kind="secondary" data-testid="cancel" type="reset">
                Cancel
              </Button>
            </div>
          </Form>
        )}
      </Formik>
    </>
  );
};
export default Project;
