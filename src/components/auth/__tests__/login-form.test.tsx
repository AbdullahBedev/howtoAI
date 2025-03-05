import React from 'react';
import { render } from '@/test/utils';
import userEvent from '@testing-library/user-event';
import LoginForm from '../login-form';
import { http, HttpResponse } from 'msw';
import { server } from '@/test/mocks/server';
import * as hooks from '@/hooks/useAuth';

// Mock the useAuth hook
jest.mock('@/hooks/useAuth', () => ({
  useAuth: () => ({
    login: jest.fn().mockImplementation((email, password) => {
      if (email === 'test@example.com' && password === 'password123') {
        return Promise.resolve();
      }
      return Promise.reject(new Error('Invalid email or password'));
    }),
    isLoading: false,
    error: null,
  }),
}));

// Mock useRouter
jest.mock('next/navigation', () => ({
  useRouter: () => ({
    push: jest.fn(),
    replace: jest.fn(),
  }),
}));

describe('LoginForm', () => {
  it('renders the login form correctly', () => {
    const { getByLabelText, getByRole, getByText } = render(<LoginForm />);
    
    // Check for form elements
    expect(getByLabelText(/email/i)).toBeInTheDocument();
    expect(getByLabelText(/password/i)).toBeInTheDocument();
    expect(getByRole('button', { name: /sign in/i })).toBeInTheDocument();
    expect(getByText(/forgot password/i)).toBeInTheDocument();
    expect(getByText(/don't have an account/i)).toBeInTheDocument();
    expect(getByText(/create an account/i)).toBeInTheDocument();
  });
  
  it('shows validation errors for empty fields', async () => {
    const user = userEvent.setup();
    const { getByRole, findByText } = render(<LoginForm />);
    
    // Submit form without filling fields
    await user.click(getByRole('button', { name: /sign in/i }));
    
    // Check for validation error messages
    expect(await findByText(/email is required/i)).toBeInTheDocument();
    expect(await findByText(/password is required/i)).toBeInTheDocument();
  });
  
  it('shows error message for invalid credentials', async () => {
    // Override the default handler with a failed login
    server.use(
      http.post('/api/auth/login', () => {
        return new HttpResponse(
          JSON.stringify({
            success: false,
            message: 'Invalid email or password',
          }),
          { status: 401 }
        );
      })
    );
    
    const user = userEvent.setup();
    const { getByLabelText, getByRole, findByText } = render(<LoginForm />);
    
    // Fill in the form with invalid credentials
    await user.type(getByLabelText(/email/i), 'wrong@example.com');
    await user.type(getByLabelText(/password/i), 'wrongpassword');
    
    // Submit the form
    await user.click(getByRole('button', { name: /sign in/i }));
    
    // Check for error message
    expect(await findByText(/invalid email or password/i)).toBeInTheDocument();
  });
  
  it('redirects after successful login', async () => {
    // Override the default handler with a successful login
    server.use(
      http.post('/api/auth/login', () => {
        return HttpResponse.json({
          success: true,
          user: {
            id: '1',
            email: 'test@example.com',
            name: 'Test User',
            role: 'USER',
          },
        });
      })
    );
    
    const user = userEvent.setup();
    const push = jest.fn();
    
    // Mock the router hooks
    jest.spyOn(require('next/navigation'), 'useRouter').mockImplementation(() => ({
      push,
      replace: jest.fn(),
    }));
    
    const { getByLabelText, getByRole } = render(<LoginForm redirectUrl="/dashboard" />);
    
    // Fill in the form with valid credentials
    await user.type(getByLabelText(/email/i), 'test@example.com');
    await user.type(getByLabelText(/password/i), 'password123');
    
    // Submit the form
    await user.click(getByRole('button', { name: /sign in/i }));
    
    // Wait for the push to be called with the expected argument
    await new Promise(resolve => setTimeout(resolve, 0));
    expect(push).toHaveBeenCalledWith('/dashboard');
  });
}); 