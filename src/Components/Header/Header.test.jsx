import React from 'react';
import { render, screen } from '@testing-library/react';

import Header from './index'; // Adjust the import path based on your project structure

test('renders footer with correct text', () => {
    render(<Header />);
    const footerElement = screen.getByText(/RESTy/i);
    expect(footerElement).toBeTruthy();
});