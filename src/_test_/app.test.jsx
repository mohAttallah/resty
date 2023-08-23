import React from 'react';
import { render, screen } from '@testing-library/react';
import App from '../App';

test('renders header', () => {
    render(<App />);
    const headerElement = screen.getByText(/RESTy/i); // Update with actual header text
    expect(headerElement).toBeTruthy();
});

test('renders form', () => {
    render(<App />);
    const formElement = screen.getByLabelText(/URL:/i); // Update with actual form label text
    expect(formElement).toBeTruthy();
});


