import {SET_POSTS, SET_PROFILES} from "../actionTypes";


export function setPosts(posts) {
    return (dispatch) => {
        dispatch({
            type: SET_POSTS,
            posts: posts
        });
    };
}

export function setProfiles(profile) {
    return (dispatch) => {
        dispatch({
            type: SET_PROFILES,
            profiles: profile
        });
    };
}
