import {SET_POSTS, SET_PROFILES} from "../actionTypes";

const initialState = {
    posts: [],
    profiles: []
};

const dataReducer = (state = initialState, action) => {
    switch (action.type) {
        case SET_POSTS:
            return {
                ...state,
                posts: action.posts
            };
        case SET_PROFILES:
            return {
                ...state,
                profiles: action.profiles
            };

        default:
            return state;
    }
};


export default dataReducer;
