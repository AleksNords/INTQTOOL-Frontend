

const initialState = {
    user:{}
};

const userReducer = (state = initialState, action) => {
    switch (action.type) {
        case 'SET_USER':
            let newState ={
                ...state,
                user: action.payload
            };
            return newState;
        case 'REMOVE_USER':
            let newState2 ={
                ...state,
                user: {}
            };
            return newState2;

        default:
            return state;
    }
};


export default userReducer;
