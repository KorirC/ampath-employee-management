import React, { useCallback, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { TextInput, Button, Form, Checkbox, PasswordInput, InlineNotification } from 'carbon-components-react';
import styles from './login.module.scss';

const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleLogin = () => {
    if (username === 'username' && password === 'password') {
      history.push('/Home');
    } else {
      setError('Wrong username or password');
    }
  };

  const history = useHistory();
  const handleRegister = useCallback(() => history.push('/RegisterUser'), [history]);

  return (
    <Form className={styles.loginform}>
      <div className="bx--grid">
        <div className="bx--row">
          <div>
            <h1 className={styles.h1}>Welcome to HR System </h1>
            <TextInput
              id="username"
              data-testid="username"
              invalidText="A valid username is required"
              labelText="User Name:"
              required
              placeholder="Enter User Name"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
            <PasswordInput
              id="password"
              hidePasswordLabel="Hide password"
              invalidText="A valid password is required"
              labelText="Password: "
              required
              placeholder="Enter Password"
              showPasswordLabel="Show password"
              data-testid="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <div>
              <Checkbox defaultChecked labelText="Remember me" id="checked" className={styles.checked} />
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
                onClick={handleLogin}
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
          </div>
        </div>
      </div>
    </Form>
  );
};

export default Login;
