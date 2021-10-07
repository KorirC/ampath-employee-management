/* eslint-disable prettier/prettier */
import React, { useCallback, useState } from 'react';
import { Formik, Form, FormikHelpers } from 'formik';
import { useHistory } from 'react-router-dom';
import { Button, TextInput, Link, PasswordInput, ToastNotification } from 'carbon-components-react';
import { addUser } from './register.resource';
import styles from './register.module.scss';
import { formValues, formInputProps } from './register.types';
import { validationSchema } from './register.validation';

export const Register: React.FC = () => {
  const [userCreated, setUserCreated] = useState<boolean>(false);

  const onFormSubmit = (values: formInputProps, helpers: FormikHelpers<formInputProps>) => {
    helpers.setSubmitting(true);
    addUser(values).then((resp) => {
      if (resp.status === 200) {
        setUserCreated(true);
      } else {
      }
    });
  };

  const history = useHistory();
  const handleOnClick = useCallback(() => history.push('/Logout'), [history]);

  return (
    <>
      {userCreated && (
        <ToastNotification title="Success!" timeout={5000} subtitle="User Created Successfully" kind="success" />
      )}
      <Formik validationSchema={validationSchema} initialValues={formValues} onSubmit={onFormSubmit}>
        {({ handleChange, setFieldValue, handleBlur, values, touched, errors }) => (
          <Form className={styles.registerform} method="POST">
            <div className="bx--grid">
              <div className="bx--row">
                <div>
                  <h1 className={styles.h1}>Create New User </h1>
                  <TextInput
                    className={styles.username}
                    id="userName"
                    name="userName"
                    data-testid="username"
                    invalid={!!(touched.userName && errors.userName)}
                    invalidText={errors.userName}
                    labelText="User Name:"
                    placeholder="Enter User Name"
                    type="text"
                    value={values.userName}
                    onChange={handleChange}
                    onBlur={handleBlur}
                  />
                  <TextInput
                    className={styles.email}
                    name="email"
                    id="email"
                    labelText="Email:"
                    placeholder="Enter valid email address"
                    invalid={!!(touched.email && errors.email)}
                    invalidText={errors.email}
                    value={values.email}
                    onChange={handleChange}
                    onBlur={handleBlur}
                  />
                  <PasswordInput
                    id="password"
                    name="password"
                    className={styles.password}
                    hidePasswordLabel="Hide password"
                    labelText="New Password: "
                    placeholder="Enter Password"
                    showPasswordLabel="Show password"
                    invalid={!!(touched.password && errors.password)}
                    invalidText={errors.password}
                    value={values.password}
                    onChange={handleChange}
                    onBlur={handleBlur}
                  />
                  <PasswordInput
                    id="passwordConfirmation"
                    name="passwordConfirmation"
                    className={styles.password}
                    hidePasswordLabel="Hide password"
                    labelText="Confirm New Password: "
                    invalid={!!(touched.passwordConfirmation && errors.passwordConfirmation)}
                    invalidText={errors.passwordConfirmation}
                    placeholder="Enter Password"
                    showPasswordLabel="Show password"
                    data-testid="password"
                    value={values.passwordConfirmation}
                    onChange={handleChange}
                    onBlur={handleBlur}
                  />
                  <div>
                    <Button
                      size="default"
                      kind="primary"
                      type="submit"
                      data-testid="register"
                      className={styles.registerbutton}
                    >
                      Create New User
                    </Button>
                    <Link className={styles.link} onClick={handleOnClick}>
                      Back to Login
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </Form>
        )}
      </Formik>
    </>
  );
};
