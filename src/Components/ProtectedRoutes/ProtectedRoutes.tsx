import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import { RouteComponentProps } from '@reach/router';

interface props extends RouteComponentProps {
  component: any;
  IsAuthenticated: any;
}
const ProtectedRoutes: React.FC<props> = ({ IsAuthenticated, component: Component, ...rest }) => {
  return (
    <Route
      {...rest}
      render={(props) => {
        if (IsAuthenticated) {
          return <Component />;
        } else {
          return <Redirect to={{ pathname: '/', state: { from: props.location } }} />;
        }
      }}
    />
  );
};
export default ProtectedRoutes;
