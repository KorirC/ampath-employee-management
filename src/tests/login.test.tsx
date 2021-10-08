import React from 'react';
import { render } from '@testing-library/react';
import { Login } from '../Components/Login/login';

describe('Login render Page', () => {
  it('renders the input fields and login button', () => {
    const { getByTestId } = render(<Login />);
    expect(getByTestId('username')).toBeInTheDocument();
    expect(getByTestId('password')).toBeInTheDocument();
    expect(getByTestId('login')).toBeInTheDocument();
  });
});
