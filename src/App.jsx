import React from 'react';
import { useState, useEffect } from 'react';
import axios from 'axios';

import './App.scss';

import Header from './Components/Header';
import Footer from './Components/Footer';
import Form from './Components/Form';
import Results from './Components/Results';

function App() {
    const [respons, setRespons] = useState({
        headers: '',
        data: "",
    });;
    const [loading, setLoading] = useState(false);
    const [reqParams, setReqParams] = useState({
        method: '',
        url: "",
        body: ""
    });

    function callApi(props) {
        setReqParams(prevState => ({
            ...prevState,
            method: props.method,
            url: props.url,
            body: props.body
        }))

    }
    useEffect(() => {
        if (reqParams.method && reqParams.url) {
            setLoading(true);
            axios({
                method: reqParams.method,
                url: reqParams.url,
                headers: {
                    'Content-Type': 'application/json', // Set the content type to JSON
                },
                data: reqParams.body ? JSON.parse(reqParams.body) : null
            }).then(response => {
                //check if there is a headers on respons or not 
                if (respons.headers && data.respons) {
                    setRespons(prevState => ({
                        ...prevState,
                        headers: response.headers,
                        data: response.data,
                    }))
                } else {
                    setRespons(prevState => ({
                        ...prevState,
                        headers: "",
                        data: response.data,
                    }))
                }
                setLoading(false); // Stop loading
            }).catch(err => {
                if (err.response) {
                    console.log('Response data:', err.response.data);
                }
                setRespons("Error");
                setLoading(false);
            })
        }

    }, [reqParams])



    return (
        <React.Fragment>
            <Header />
            <Form className="form" handleApiCall={callApi} />
            <div className="grid-section">
                <div className="left-section">
                    <div>Request Method: {reqParams.method}</div>
                    <div>URL: {reqParams.url}</div>
                </div>
                <div className="right-section">
                    <Results role="result" data={respons} loading={loading} />
                </div>
            </div>
            <Footer />
        </React.Fragment>
    )
}

export default App;


