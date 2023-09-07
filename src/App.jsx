import React, { useEffect, useReducer, useState } from 'react';
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
    const [previousLink, setPreviousLink] = useState(null);
    const [nextLink, setNextLink] = useState(null);


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
                    const nextLinkHeader = response.headers['link'];
                    if (nextLinkHeader) {
                        const links = parseLinkHeader(nextLinkHeader);
                        console.log(links)
                        setNextLink(links.next);
                        setPreviousLink(links.first);
                    } else {
                        setNextLink(null);
                        setPreviousLink(null);
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

    function parseLinkHeader(linkHeader) {
        const links = {};
        linkHeader.split(',').forEach(part => {
            const section = part.split(';');
            if (section.length !== 2) return;
            const url = section[0].replace(/<(.*)>/, '$1').trim();
            const rel = section[1].replace(/rel="(.*)"/, '$1').trim();
            links[rel] = url;
        });
        return links;
    }

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
                    <Results role="result" data={state.respons} loading={state.loading} previousLink={previousLink} nextLink={nextLink} />

                </div>
                <div>
                    <History handleApiCall={callApi} data={{
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


