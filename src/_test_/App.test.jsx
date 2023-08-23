import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from '../App';

describe('App component', () => {
    test('renders header and footer', () => {
        render(<App />);
        const header = screen.getByText(/RESTy/i);
        const footer = screen.getByText(/© 2023 RESTy/i);
        expect(header).toBeInTheDocument();
        expect(footer).toBeInTheDocument();
    });

    test('handles form input and displays request details', async () => {
        render(<App />);
        const methodSelect = screen.getByLabelText(/method/i);
        const urlInput = screen.getByLabelText(/url/i);

        userEvent.selectOptions(methodSelect, 'GET');
        userEvent.type(urlInput, 'https://api.example.com/data');

        const requestMethod = await screen.findByText(/Request Method: GET/i);
        const requestURL = await screen.findByText(/URL: https:\/\/api.example.com\/data/i);

        expect(requestMethod).toBeInTheDocument();
        expect(requestURL).toBeInTheDocument();
    });

    test('renders results section', () => {
        render(<App />);
        const resultsSection = screen.getByText(/Output:/i);
        expect(resultsSection).toBeInTheDocument();
    });

    test('renders loading message when clicking "GO!"', async () => {
        render(<App />);
        const methodSelect = screen.getByLabelText(/method/i);
        const urlInput = screen.getByLabelText(/url/i);
        const goButton = screen.getByText(/GO!/i);

        userEvent.selectOptions(methodSelect, 'GET');
        userEvent.type(urlInput, 'https://api.example.com/data');
        userEvent.click(goButton);

        const loadingMessage = await screen.findByText(/Loading.../i);
        expect(loadingMessage).toBeInTheDocument();
    });
});
