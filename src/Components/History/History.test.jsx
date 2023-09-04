import React from 'react';
import { render, screen } from '@testing-library/react';

import '@testing-library/jest-dom'

import History from './index';
import { test } from 'vitest';


test.skip('renders header', () => {
    render(<History />);
    const headerElement = screen.getByText(/RESTy/i);
    expect(headerElement).toBeTruthy();
});

test.skip('renders form', () => {
    render(<History />);
    const formElement = screen.getByLabelText(/URL:/i);
    expect(formElement).toBeTruthy();
});





