import React from "react";

export default function History(props) {
    const { url, methode } = props.data;
    console.log(props.data)
    return (
        <section>
            <h2>History</h2>
            <div>
                <p>URL: {url}</p>
                <p>Method: {methode}</p>
            </div>
        </section>
    )
}