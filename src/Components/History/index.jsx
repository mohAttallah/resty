import React, { useEffect } from "react";
import { useState, useReducer } from "react";

function reducer(state, props) {

    const { url, methode } = props.payload
    const data = {
        url: url,
        methode: methode
    }
    if (data !== null) {
        localStorage.setItem(`${methode}-${url}`, JSON.stringify(data));
    } return {
        ...state,
        url: url,
        methode: methode,
    };
}


export default function History(props) {
    const initialState = {
        url: "",
        methode: ""
    }

    // const { url, method } = props.data || { url: '', method: '' };

    const { url, methode } = props.data;
    const [state, dispatch] = useReducer(reducer, initialState);
    useEffect(() => {
        dispatch({
            payload: { url, methode }
        });
    }, [props])
    
    const keys = Object.keys(localStorage);

    const handleSendData = (url, methode) => {
        const formData = {
            method: methode,
            url: url,
            body: ""
        };
        props.handleApiCall(formData);
    };

    return (
        <section>
            <h2>History</h2>
            {keys.map(key => {
                let value = localStorage.getItem(key);
                if (value !== null) {
                    value = JSON.parse(value);
                    return (
                        <div key={key}>
                            <p>URL: {value.url}</p>
                            <p>Method: {value.methode}</p>
                            <button onClick={() => handleSendData(value.url, value.methode)}>
                                Fetch
                            </button>
                            <hr />
                        </div>
                    );
                }
                return null;
            })}
        </section>

    )
}