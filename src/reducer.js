
const initialState = {
    respons: {
        headers: '',
        data: '',
    },
    loading: false,
    reqParams: {
        method: '',
        url: '',
        body: '',
    },
    previousLink: null,
    nextLink: null,
    //form
    selectedMethod: 'GET',
    active: ""
};


function reducer(state, action) {
    switch (action.type) {
        // app components case  
        case 'SET_REQUEST_PARAMS':
            return {
                ...state,
                reqParams: {
                    method: action.payload.method,
                    url: action.payload.url,
                    body: action.payload.body,
                },
            };
        case 'API_REQUEST_START':
            return {
                ...state,
                loading: true,
            };
        case 'API_REQUEST_SUCCESS':
            return {
                ...state,
                respons: {
                    headers: action.payload.headers,
                    data: action.payload.data,
                },
                loading: false,
            };
        case 'API_REQUEST_ERROR':
            return {
                ...state,
                respons: 'Error',
                loading: false,
            };
        case 'SET_PREVIOUS_LINK':
            return {
                ...state,
                previousLink: action.payload.previousLink
            };

        case 'SET_NEXT_LINK':
            return {
                ...state,
                nextLink: action.payload.nextLink
            };
        case 'SET_METHOD':

            return {
                ...state,
                selectedMethod: `${action.methode}`
            };
        case 'SET_STYLE':
            return {
                ...state,
                active: action.style
            };
        default:
            return state;
    }
}

export { reducer, initialState };
