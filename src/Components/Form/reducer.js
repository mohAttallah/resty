const initialState = {
    selectedMethod: 'GET',
    active: ""
};
function reducer(state, action) {

    switch (action.type) {
        case 'SET_METHOD':
            return {
                ...state,
                selectedMethod: `${action.payload}`
            };
        case 'SET_STYLE':
            return {
                ...state,
                active: action.payload
            };

        default:
            return state;
    }
}

export { reducer, initialState };