import React from 'react';
import { Route, Redirect } from 'react-router-dom';

function ProtectedRoutes({ component: Component, ...rest }) {
  const userProtected = localStorage.getItem('user');

  return (
    <Route
      {...rest}
      render={(props) => {
        if (userProtected) {
          return <Component />;
        } else {
          return <Redirect to={{ pathname: '/', state: { from: props.location } }} />;
        }
      }}
    />
  );
}
export default ProtectedRoutes;
