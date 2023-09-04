// import React from 'react';
import { useReducer } from 'react';
import './Form.scss';


import { reducer, initialState } from './reducer';


function Form(props) {
    const [state, dispatch] = useReducer(reducer, initialState);
    console.log(state)

    const handleSubmit = e => {
        e.preventDefault();
        console.log()
        const urlValue = e.target.url ? e.target.url.value : '';
        if (state.selectedMethod === "POST" || state.selectedMethod === "PUT") {
            const formData = {
                method: state.selectedMethod,
                url: urlValue,
                body: e.target.body.value
            };
            props.handleApiCall(formData);
        } else {
            const formData = {
                method: state.selectedMethod,
                url: urlValue,
                body: ""
            };
            props.handleApiCall(formData);
        }

    }
    // render body
    let bodyLabel = null;
    console.log("methode:",state.selectedMethod)
    if (state.selectedMethod === "POST" || state.selectedMethod === "PUT") {
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
        if (state.active) {
            if (state.active !== e) {
                state.active.target.style.backgroundColor = "white";
            }
        }
        console.log("dispatch",e.target.textContent)
        dispatch({ type: 'SET_METHOD', payload: e.target.textContent });
        console.log("ssssssss",e.target.textContent)
        e.target.style.backgroundColor = '#3498db';
        dispatch({ type: 'SET_STYLE', payload: e });
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