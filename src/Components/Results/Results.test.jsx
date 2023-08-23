import React from 'react';
import { render, screen } from '@testing-library/react';
import Results from './index';

test('renders loading message when loading is true', () => {
    render(<Results loading={true} />);
    const loadingMessage = screen.getByText(/Loading.../i);
    expect(loadingMessage).toBeTruthy();
});

