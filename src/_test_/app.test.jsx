import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { rest } from 'msw'
import { waitForElementToBeRemoved } from '@testing-library/react';

import { setupServer } from 'msw/node'
import Fetch from '../App'
import '@testing-library/jest-dom'
import { Form } from '../Components/Form';

import App from '../App';
const server = setupServer(
    rest.get('/greeting', (req, res, ctx) => {
        return res(ctx.json({
            method: "get",
            url: "sss",
            body: "",
        }))
    }),
)

beforeAll(() => server.listen())
afterEach(() => server.resetHandlers())
afterAll(() => server.close())


test.skip('loads and displays greeting', async () => {
    render(<Fetch url="/greeting" />);
    const goButton = screen.getByText('GO!');
    fireEvent.click(goButton);

    const waitForLoadingSpinnerToBeRemoved = async () => {
        while (screen.queryByTestId('loading-spinner')) {
            await waitFor(() => { }, { timeout: 100 }); 
        }
    };
    await waitForLoadingSpinnerToBeRemoved();
    const resultsElement = await waitFor(() => screen.getByRole('result'));
    expect(resultsElement).toBeInTheDocument();
    expect(resultsElement).toHaveTextContent('Hello there!');
});

test('renders header', () => {
    render(<App />);
    const headerElement = screen.getByText(/RESTy/i);
    expect(headerElement).toBeTruthy();
});

test('renders form', () => {
    render(<App />);
    const formElement = screen.getByLabelText(/URL:/i);
    expect(formElement).toBeTruthy();
});





