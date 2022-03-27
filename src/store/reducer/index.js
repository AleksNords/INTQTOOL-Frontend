import {combineReducers} from 'redux'
import isLoggedReducer from './isLoggedReducer'
import userReducer from './userReducer'


export default combineReducers({
    userReducer,
    isLoggedReducer
})