import React from 'react';
import { render, screen, waitFor, fireEvent } from '@testing-library/react';
import { rest } from 'msw'
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


test('loads and displays greeting', async () => {
    render(<Fetch url="/greeting" />)
    const goButton = screen.getByText('GO!');

    await waitFor(() => expect(goButton).toBeInTheDocument());
    const resultsElement = screen.getByRole('result');
    expect(resultsElement).toHaveTextContent('hello there');

})

// test('loads and displays greeting', async () => {
//     render(<App />);
//     fireEvent.click(screen.getByText('GO!'));
//     expect(screen.getByText('Request Method:')).toBeTruthy();
//     expect(screen.getByText('method')).toBeTruthy();
//     expect(screen.getByText('hello there')).toBeInTheDocument();
// }); 



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





