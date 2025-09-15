import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import userEvent from '@testing-library/user-event';
import { BrowserRouter } from 'react-router-dom';
import SignInForm from './SignInForm';
import AuthProvider from '../../../core/auth/AuthProvider';
import { AuthContext } from '../../../core/auth/AuthContext';

describe('SignInForm', () => {
  test('renders the form with email and password', () => {
    render(
      <AuthProvider>
        <SignInForm />
      </AuthProvider>,
      { wrapper: BrowserRouter },
    );

    expect(screen.getByLabelText(/email/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/password/i)).toBeInTheDocument();

    expect(screen.getByRole('button', { name: /sign in/i })).toBeInTheDocument();
  });

  test('shows validation errors when fields are empty', async () => {
    render(
      <AuthProvider>
        <SignInForm />
      </AuthProvider>,
      { wrapper: BrowserRouter },
    );

    await userEvent.click(screen.getByRole('button', { name: /sign in/i }));

    expect(await screen.findByText('Email is required')).toBeInTheDocument();
    expect(await screen.findByText('Password is required')).toBeInTheDocument();
  });

  test('calls login function with correct data', async () => {
    const mockLogin = jest.fn();

    render(
      <AuthContext.Provider value={{ isAuthenticated: false, login: mockLogin, logout: jest.fn() }}>
        <SignInForm />
      </AuthContext.Provider>,
      { wrapper: BrowserRouter },
    );

    const email = 'test@test.com';
    const password = 'password123';

    await userEvent.type(screen.getByLabelText(/email/i), email);
    await userEvent.type(screen.getByLabelText(/password/i), password);
    await userEvent.click(screen.getByRole('button', { name: /sign in/i }));

    expect(mockLogin).toHaveBeenCalledWith(email, password);
  });
});
