import React, { useCallback } from "react";
import { useHistory } from "react-router-dom";
import {
  TextInput,
  Button,
  Form,
  Link,
  PasswordInput,
} from "carbon-components-react";
import styles from "./register.module.scss";

const Register = () => {
  const history = useHistory();
  const handleOnClick = useCallback(() => history.push("/"), [history]);

  return (
    <Form className={styles.registerform}>
      <div className="bx--grid">
        <div className="bx--row">
          <div>
            <h1 className={styles.h1}>Create New User </h1>
            <TextInput
              className={styles.username}
              id="username"
              data-testid="username"
              invalidText="A valid username is required"
              labelText="User Name:"
              placeholder="Enter User Name"
              type="text"
              required
            />
            <TextInput
              className={styles.email}
              id="email"
              invalidText="A valid username is required"
              labelText="Email:"
              placeholder="Enter valid email address"
              required
            />
            <PasswordInput
              id="password"
              className={styles.password}
              hidePasswordLabel="Hide password"
              invalidText="A valid password is required"
              labelText="New Password: "
              required
              placeholder="Enter Password"
              showPasswordLabel="Show password"
            />
            <PasswordInput
              id="password"
              className={styles.password}
              hidePasswordLabel="Hide password"
              invalidText="A valid password is required"
              labelText="Confirm New Password: "
              required
              placeholder="Enter Password"
              showPasswordLabel="Show password"
              data-testid="password"
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
  );
};

export default Register;
