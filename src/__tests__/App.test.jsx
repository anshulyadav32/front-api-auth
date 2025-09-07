
import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import App from '../App';

describe('Navigation', () => {
  it('renders navigation links', () => {
    render(<App />);
  expect(screen.getAllByText(/Login/i).length).toBeGreaterThan(0);
  expect(screen.getAllByText(/Register/i).length).toBeGreaterThan(0);
  });
});

describe('Login Page', () => {
  it('renders Login page when navigating to /login', () => {
    window.history.pushState({}, '', '/login');
    render(<App />);
  expect(screen.getAllByText(/Login/i).length).toBeGreaterThan(0);
  });
});

describe('Register Page', () => {
  it('renders Register page when navigating to /register', () => {
    window.history.pushState({}, '', '/register');
    render(<App />);
  expect(screen.getAllByText(/Register/i).length).toBeGreaterThan(0);
  });
});
