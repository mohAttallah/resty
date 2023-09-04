

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
};

function reducer(state, action) {
    switch (action.type) {
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
        default:
            return state;
    }
}

export { reducer, initialState };
