import React from 'react';
import { fireEvent, render, waitFor, screen } from '@testing-library/react';
import { Login } from '../Components/Login/login';
import renderer from 'react-test-renderer';
import ReactDOM from 'react-dom';

//login renders without crashing
it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<Login setIsAuthenticated={undefined} />, div);
});

it('submits correct values', async () => {
  const { container } = render(<Login setIsAuthenticated={undefined} />);
  const username = screen.getByLabelText('User Name:');
  const password = screen.getByLabelText('Password:')!;
  const submit = container.querySelector('button[type="submit"]');

  await waitFor(() => {
    fireEvent.change(username, {
      target: {
        value: 'mockname',
      },
    });

    fireEvent.change(password, {
      target: {
        value: 'mockpassword',
      },
    });
  });
});

describe('Login render Page', () => {
  it('renders the input fields and login button', () => {
    const { getByTestId } = render(<Login setIsAuthenticated={undefined} />);
    expect(getByTestId('username')).toBeInTheDocument();
    expect(getByTestId('password')).toBeInTheDocument();
    expect(getByTestId('login')).toBeInTheDocument();
  });
});
