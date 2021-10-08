import React, { useCallback, useState } from 'react';
import { Formik, Form, FormikHelpers } from 'formik';
import { useHistory } from 'react-router-dom';
import { TextInput, Button, Checkbox, PasswordInput, InlineNotification, Link } from 'carbon-components-react';
import { loginUser } from './login.resource';
import { Register } from '../Register/register';
import { formValues, formInputProps } from './login.types';
import { validationSchema } from './login.validation';
import styles from './login.module.scss';

export const Login: React.FC = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const onFormSubmit = (values: formInputProps, helpers: FormikHelpers<formInputProps>) => {
    helpers.setSubmitting(true);
    //console.log('Values', values);
    loginUser(values).then((resp) => {
      if (resp.data.token) {
        history.push('/Home');
        localStorage.setItem('token', resp.data.token);
      } else {
        console.log('error');
        setError('Wrong username or password');
      }
    });
  };

  const history = useHistory();
  const handleRegister = () => history.push('/RegisterUser');

  return (
    <>
      <Formik validationSchema={validationSchema} initialValues={formValues} onSubmit={onFormSubmit}>
        {({ handleChange, setFieldValue, handleBlur, values, touched, errors }) => (
          <Form className={styles.loginform}>
            <div className="bx--grid">
              <div className="bx--row">
                <div>
                  <h1 className={styles.h1}>Welcome to HR System </h1>
                  <TextInput
                    id="userName"
                    name="userName"
                    data-testid="username"
                    invalid={!!(touched.userName && errors.userName)}
                    invalidText={errors.userName}
                    labelText="User Name:"
                    required
                    placeholder="Enter User Name"
                    type="text"
                    value={values.userName}
                    onChange={handleChange}
                    onBlur={handleBlur}
                  />
                  <PasswordInput
                    id="password"
                    hidePasswordLabel="Hide password"
                    labelText="Password: "
                    required
                    placeholder="Enter Password"
                    showPasswordLabel="Show password"
                    data-testid="password"
                    invalid={!!(touched.password && errors.password)}
                    invalidText={errors.password}
                    value={values.password}
                    onChange={handleChange}
                    onBlur={handleBlur}
                  />
                  <div>
                    <Checkbox labelText="Remember me" id="checked" className={styles.checked} />
                    {error && (
                      <div>
                        <InlineNotification iconDescription="Error" kind="error" title="Login Error:Try Again" />
                      </div>
                    )}
                    <Button
                      size="field"
                      kind="primary"
                      type="submit"
                      data-testid="login"
                      className={styles.logoutbutton}
                    >
                      Login
                    </Button>
                    <Button
                      size="field"
                      kind="secondary"
                      type="submit"
                      className={styles.registerbutton}
                      onClick={handleRegister}
                    >
                      Register
                    </Button>
                  </div>
                  {/* <Link className={styles.link} href="http://www.carbondesignsystem.com">
                    Forgot Password?
                  </Link> */}
                </div>
              </div>
            </div>
          </Form>
        )}
      </Formik>
    </>
  );
};
