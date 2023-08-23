import React from 'react';
import './Result.scss'
function Results(props) {
    console.log(props)
    if (props.loading === true) {
        return (
                <section>
                    <h4>Output: </h4>
                    <pre className="code-output">Loading...</pre>
                </section>
        )

    } else {
        return (
                <section>
                    <h2>Output: </h2>
                    <pre className="code-output">{props.data ? JSON.stringify(props.data, undefined, 2) : null}</pre>
                </section>
        );

    }

}

export default Results;