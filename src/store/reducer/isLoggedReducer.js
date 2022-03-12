const initialState = {
    isLogged: false,
    sessionToken: ""
}
const isLoggedReducer = (state = initialState, action) => {
    switch (action.type) {
        case 'SET_LOGGED':
            let newState = {
                ...state,
                isLogged: action.payload.isLogged,
                sessionToken: action.payload.sessionToken
            };
            return newState;

        default:
            return state;
    }
};


export default isLoggedReducer;