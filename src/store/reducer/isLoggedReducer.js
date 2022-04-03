const initialState = {
    isLogged: false,
    jwtToken: ""
}
const isLoggedReducer = (state = initialState, action) => {
    switch (action.type) {
        case 'SET_LOGGED':
            let newState = {
                ...state,
                isLogged: action.payload.isLogged,
                jwtToken: action.payload.jwtToken
            };
            return newState;

        default:
            return state;
    }
};


export default isLoggedReducer;