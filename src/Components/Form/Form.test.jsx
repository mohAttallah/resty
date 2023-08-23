import React from 'react';
import { render, screen } from '@testing-library/react';

import Form from './index'; // Adjust the import path based on your project structure

test('renders "GO!" button', () => {
    render(<Form />);
    const goButton = screen.getByText(/GO!/i);
    expect(goButton).toBeTruthy();
});