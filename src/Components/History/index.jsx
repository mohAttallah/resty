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

    const { url, methode } = props.data;
    const [state, dispatch] = useReducer(reducer, initialState);
    useEffect(() => {
        dispatch({
            payload: { url, methode }
        });
    }, [props])
    const keys = Object.keys(localStorage);

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
                        </div>
                    );
                }
                return null; 
            })}
        </section>

    )
}