import React from 'react';
import { useState } from 'react';
import axios from 'axios';

import './App.scss';

import Header from './Components/Header';
import Footer from './Components/Footer';
import Form from './Components/Form';
import Results from './Components/Results';

function App() {
    const [respons, setRespons] = useState(null);
    const [loading, setLoading] = useState(false);
    const [reqParams, setReqParams] = useState({
        method: '',
        url: ""
    });
    function callApi(props) {
        // mock output
        setReqParams(prevState => ({
            ...prevState,
            method: props.method,
            url: props.url,
        }))
        setLoading(true);
        axios({
            method: props.method,
            url: props.url,
        }).then(response => {
            setRespons(response.data);
            setLoading(false); // Stop loading
        }).catch(err =>{
            setRespons("Error");
            setLoading(false); 
        })
    }

    return (
        <React.Fragment>
            <Header />
            <Form handleApiCall={callApi} />
            <div className="grid-section">
                <div className="left-section">
                    <div>Request Method: {reqParams.method}</div>
                    <div>URL: {reqParams.url}</div>
                </div>
                <div className="right-section">
                    <Results data={respons} loading={loading} />
                </div>
            </div>


            <Footer />
        </React.Fragment>
    )
}

export default App;