import React from 'react';
import { render, screen } from '@testing-library/react';

import Footer from './index'; // Adjust the import path based on your project structure

test('renders footer with correct text', () => {
    render(<Footer />);
    const footerElement = screen.getByText(/Mohammad Attallah/i);
    expect(footerElement).toBeTruthy();
});