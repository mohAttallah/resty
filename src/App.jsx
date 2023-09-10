import React, { useEffect, useReducer } from 'react';
import axios from 'axios';
import './App.scss';
import Header from './Components/Header';
import Footer from './Components/Footer';
import Form from './Components/Form';
import Results from './Components/Results';
import History from './Components/History';
import { reducer, initialState } from './reducer';



function App() {

    const [state, dispatch] = useReducer(reducer, initialState);
    const { reqParams, respons, loading, previousLink, nextLink } = state


    function callApi(props) {
        console.log(props)
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
                if (response.headers && response.data) {
                    //check if there is a next url or not  
                    if (response.data.next) {
                        dispatch({
                            type: 'SET_NEXT_LINK',
                            payload: { nextLink: response.data.next },
                        });
                        console.log(response.data.next)
                        dispatch({
                            type: 'SET_PREVIOUS_LINK',
                            payload: { previousLink: response.data.previous },
                        });
                    }
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

    return (
        <React.Fragment>
            <Header />
            <Form className="form" handleApiCall={callApi} state={state} dispatch={dispatch} />
            <div className="grid-section">
                <div className="left-section">
                    <div>Request Method: {reqParams.method}</div>
                    <div>URL: {reqParams.url}</div>
                </div>
                <div className="right-section">
                    <Results role="result" data={respons} loading={loading} previousLink={previousLink} nextLink={nextLink} handleApiCall={callApi} />
                </div>
                <div>
                    <History handleApiCall={callApi} data={{
                        url: reqParams.url,
                        methode: reqParams.method
                    }} />
                </div>
            </div>
            <Footer />
        </React.Fragment>
    )
}

export default App;


