// import React from 'react';
import React, { useState } from 'react';
import './Form.scss';

function Form(props) {
    const [selectedMethod, setSelectedMethod] = useState('GET');
    const [active, setActiveStyle] = useState(null);
    const handleSubmit = e => {
        e.preventDefault();
        const formData = {
            method: selectedMethod,
            url: e.target.url.value,
        };
        props.handleApiCall(formData);
    }
    // render body
    let bodyLabel = null;
    if (selectedMethod === "POST" || selectedMethod === "PUT") {
        bodyLabel = (
            <label className='gorgeous-label'>
                <span>Body: </span>
                <textarea type="text" name="body" className='gorgeous-textarea' />
            </label>
        )
    }

    const handleActiveMethod = e => {
        //first change deafult value Color 
        const deafultSelect = document.getElementById('get');
        deafultSelect.style.backgroundColor = 'white';
        if (active) {
            if (active !== e) {
                active.target.style.backgroundColor = "white";
            }
        }
        setSelectedMethod(e.target.textContent);
        e.target.style.backgroundColor = "#3498db";
        setActiveStyle(e);
    }


    return (
        <>
            <form onSubmit={handleSubmit}>
                <label className='url gorgeous-label'>
                    <span>URL: </span>
                    <input name='url' type='text' className='gorgeous-input' />
                </label>
                <label className="methods">
                    <span id="get" onClick={(e) => handleActiveMethod(e)} >GET</span>
                    <span id="post" onClick={(e) => handleActiveMethod(e)}>POST</span>
                    <span id="put" onClick={(e) => handleActiveMethod(e)}>PUT</span>
                    <span id="delete" onClick={(e) => handleActiveMethod(e)}>DELETE</span>
                </label>

                {bodyLabel}
                <button className='go gorgeous' type="submit">GO!</button>

            </form>
        </>
    )
}

export default Form;