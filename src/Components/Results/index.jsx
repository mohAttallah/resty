import { useState } from 'react';
import './Result.scss';

function Results(props) {
    const data = props.data.data;
    console.log(data)
    let length = 0;
    let itemsPerPage = 1;

    if (typeof data === "object") {
        const keys = Object.keys(data);
        length = keys.length;
    } else if (Array.isArray(data)) {
        length = data.length;
    }


    const [currentPage, setCurrentPage] = useState(1);
    const totalPages = Math.ceil(length / itemsPerPage);

    function handlePrev() {
        if (currentPage > 1) {
            setCurrentPage(currentPage - 1);
        }
    }

    function handleNext() {
        if (currentPage < totalPages) {
            setCurrentPage(currentPage + 1);
        }
    }

    if (props.loading === true) {
        return (
            <section>
                <h4>Output: </h4>
                <pre className="code-output">Loading...</pre>
            </section>
        );
    } else {
        const startIndex = (currentPage - 1) * itemsPerPage;
        let current = null;

        if (Array.isArray(data)) {
            current = data.slice(startIndex, startIndex + itemsPerPage);
        } else if (typeof data === "object") {
            const keys = Object.keys(data);
            const slicedKeys = keys.slice(startIndex, startIndex + itemsPerPage);
            current = {};
            console.log(current)
            for (const key of slicedKeys) {
                current[key] = data[key];
            }
        }

        return (
            <>
                <section>
                    <h2>Headers:</h2>
                    <pre className="code-output">{props.data ? JSON.stringify(props.data.headers, undefined, 2) : null}</pre>
                </section>
                <section>
                    <h2>Output:</h2>
                    <pre className="code-output">{JSON.stringify(current, undefined, 2)}</pre>
                    <button onClick={handlePrev} disabled={currentPage === 1}>
                        Previous
                    </button>
                    <button onClick={handleNext} disabled={currentPage === totalPages}>
                        Next
                    </button>
                </section>
            </>
        );
    }
}

export default Results;
