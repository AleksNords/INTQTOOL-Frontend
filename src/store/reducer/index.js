import {combineReducers} from 'redux'
import isLoggedReducer from './isLoggedReducer'
import userReducer from './userReducer'


// TODO - is the logged-in-user the only state that you need to share across the components?
export default combineReducers({
    userReducer,
    isLoggedReducer
})
