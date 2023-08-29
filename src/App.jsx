import React, { useEffect, useReducer } from 'react';
import axios from 'axios';
import './App.scss';
import Header from './Components/Header';
import Footer from './Components/Footer';
import Form from './Components/Form';
import Results from './Components/Results';
import History from './Components/History';

const initialState = {
    respons: {
        headers: '',
        data: '',
    },
    loading: false,
    reqParams: {
        method: '',
        url: '',
        body: '',
    },
};
function reducer(state, action) {
    switch (action.type) {
        case 'SET_REQUEST_PARAMS':
            return {
                ...state,
                reqParams: {
                    method: action.payload.method,
                    url: action.payload.url,
                    body: action.payload.body,
                },
            };
        case 'API_REQUEST_START':
            return {
                ...state,
                loading: true,
            };
        case 'API_REQUEST_SUCCESS':
            return {
                ...state,
                respons: {
                    headers: action.payload.headers,
                    data: action.payload.data,
                },
                loading: false,
            };
        case 'API_REQUEST_ERROR':
            return {
                ...state,
                respons: 'Error',
                loading: false,
            };
        default:
            return state;
    }
}




function App() {

    const [state, dispatch] = useReducer(reducer, initialState);

    function callApi(props) {
        dispatch({ type: 'SET_REQUEST_PARAMS', payload: props });
    }

    useEffect(() => {
        const { method, url, body } = state.reqParams;
        if (method && url) {
            dispatch({ type: 'API_REQUEST_START' });
            axios({
                method: method,
                url: url,
                headers: {
                    'Content-Type': 'application/json', // Set the content type to JSON
                },
                data: body ? JSON.parse(body) : null
            }).then(response => {
                //check if there is a headers on respons or not 
                if (state.respons.headers && response.data) {
                    dispatch({
                        type: 'API_REQUEST_SUCCESS',
                        payload: { headers: response.headers, data: response.data },
                    });
                } else {
                    dispatch({
                        type: 'API_REQUEST_SUCCESS',
                        payload: { headers: '', data: response.data },
                    });
                }
                // setLoading(false); 
            }).catch(err => {
                if (err.response) {
                    console.log('Response data:', err.response.data);
                }
                dispatch({ type: 'API_REQUEST_ERROR' });
            })
        }

    }, [state.reqParams])

    console.log(state.respons)

    return (
        <React.Fragment>
            <Header />
            <Form className="form" handleApiCall={callApi} />
            <div className="grid-section">
                <div className="left-section">
                    <div>Request Method: {state.reqParams.method}</div>
                    <div>URL: {state.reqParams.url}</div>
                </div>
                <div className="right-section">
                    <Results role="result" data={state.respons} loading={state.loading} />
                </div>
                <div>
                    <History data={{
                        url: state.reqParams.url,
                        methode: state.reqParams.method
                    }} />
                </div>
            </div>
            <Footer />
        </React.Fragment>
    )
}

export default App;


