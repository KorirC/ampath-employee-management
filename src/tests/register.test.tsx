import React from 'react';
import { render } from '@testing-library/react';
import { Register } from '../Components/Register/register';

describe('Register Page', () => {
  it('renders the input fields and register button', () => {
    const { getByTestId } = render(<Register />);
    expect(getByTestId('username')).toBeInTheDocument();
    expect(getByTestId('password')).toBeInTheDocument();
    expect(getByTestId('register')).toBeInTheDocument();
  });
});
