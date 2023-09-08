import { useState, useEffect } from 'react';
import './Result.scss';

function Results(props) {
    const { loading, previousLink, nextLink } = props;
    const data = props.data.data;
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 1;

    useEffect(() => {
        setCurrentPage(1);
    }, [data]);

    let totalPages
    //check  data type
    if (Array.isArray(data)) {
        totalPages = Math.ceil(data.length / itemsPerPage);
    }
    //total pages is length / items 

    function handlePrev() {
        if (currentPage > 1 && previousLink) {
            setCurrentPage(currentPage - 1);
        }
    }

    function handleNext() {
        if (currentPage < totalPages && nextLink) {
            setCurrentPage(currentPage + 1);
        }
    }
    let currentData = null;

    // Render loading state
    if (loading === true) {
        return (
            <section>
                <h4>Output: </h4>
                <pre className="code-output">Loading...</pre>
            </section>
        );
    } else if (Array.isArray(data)) {
        const startIndex = (currentPage - 1) * itemsPerPage;
        const endIndex = startIndex + itemsPerPage;
        currentData = data.slice(startIndex, endIndex);

    } else {
        currentData = data
    }
    return (
        <>
            <section>
                <h2>Headers:</h2>
                <pre className="code-output">{props.data ? JSON.stringify(props.data.headers, undefined, 2) : null}</pre>
            </section>

            <section>
                <h2>Output:</h2>
                <pre className="code-output">{JSON.stringify(currentData, undefined, 2)}</pre>

                <button onClick={handlePrev} disabled={!previousLink}>
                    Previous
                </button>
                <button onClick={handleNext} disabled={!nextLink}>
                    Next
                </button>
            </section>
        </>
    );
}


export default Results;
