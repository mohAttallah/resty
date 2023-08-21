import React from 'react';
import  { useState } from 'react';

import './Form.scss';

function Form(props) {
    const [selectedMethod, setSelectedMethod] = useState('GET');
    const handleSubmit = e => {
        e.preventDefault();
        const formData = {
            method: selectedMethod,
            url: e.target.url.value,
        };
        props.handleApiCall(formData);
    }
    const handleMethodClick = method => {
        setSelectedMethod(method);
    }


    return (
        <>
            <form onSubmit={handleSubmit}>
                <label >
                    <span>URL: </span>
                    <input name='url' type='text' />
                    <button type="submit">GO!</button>
                </label>
                <label className="methods">
                    <span id="get" onClick={() => handleMethodClick('GET')}>GET</span>
                    <span id="post" onClick={() => handleMethodClick('POST')}>POST</span>
                    <span id="put" onClick={() => handleMethodClick('PUT')}>PUT</span>
                    <span id="delete" onClick={() => handleMethodClick('DELETE')}>DELETE</span>

                </label>
            </form>
        </>
    )
}

export default Form;