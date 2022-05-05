const initialState = {
    notifications: []
}
const notificationReducer = (state = initialState, action) => {
    switch (action.type) {
        case 'SET_NOTIFICATIONS':
            let newState = {
                ...state,
                notifications: action.payload.notifications
            };
            return newState;

        default:
            return state;
    }
};


export default notificationReducer;