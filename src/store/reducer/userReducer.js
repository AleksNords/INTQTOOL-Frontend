

const initialState = {
    user:{}
};

const userReducer = (state = initialState, action) => {
    switch (action.type) {
        case 'SET_USER':
            console.log(action.payload);
            let newState ={
                ...state,
                user: action.payload.user
            };
            return newState;
        case 'REMOVE_USER':
            let newState2 ={
                user: {}
            };
            return newState2;

        default:
            return state;
    }
};


export default userReducer;
