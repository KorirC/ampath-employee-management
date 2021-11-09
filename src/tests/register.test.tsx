import React from 'react';
import { fireEvent, render, waitFor } from '@testing-library/react';
import { Register } from '../Components/Register/register';
import ReactDOM from 'react-dom';

//register renders without crashing
it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<Register />, div);
});

it('submits correct values', async () => {
  const { container } = render(<Register />);
  const username = container.querySelector('input[name="userName"]')!;
  const email = container.querySelector('input[name="email"]')!;
  const password = container.querySelector('input[name="password"]')!;
  const submit = container.querySelector('button[type="submit"]');

  await waitFor(() => {
    fireEvent.change(username, {
      target: {
        value: 'mockname',
      },
    });

    fireEvent.change(email, {
      target: {
        value: 'mockemail',
      },
    });

    fireEvent.change(password, {
      target: {
        value: 'mockpassword',
      },
    });
  });
});

describe('Register Page', () => {
  it('renders the input fields and register button', () => {
    const { getByTestId } = render(<Register />);
    expect(getByTestId('username')).toBeInTheDocument();
    expect(getByTestId('password')).toBeInTheDocument();
    expect(getByTestId('register')).toBeInTheDocument();
  });
});
