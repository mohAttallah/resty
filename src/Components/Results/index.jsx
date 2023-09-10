import './Result.scss';

function Results(props) {
    const { loading, previousLink, nextLink } = props;
    const data = props.data.data;

    //total pages is length / items 
    const handleSendData = (url, methode) => {
        console.log(url)
        const formData = {
            method: methode,
            url: url,
            body: ""
        };
        props.handleApiCall(formData);
    };

    function handlePrev() {

        handleSendData(previousLink, 'GET')
    }

    function handleNext() {

        handleSendData(nextLink, 'GET')
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
