import {combineReducers} from 'redux'
import isLoggedReducer from './isLoggedReducer'
import userReducer from './userReducer'
import notificationReducer from "./notificationReducer";


export default combineReducers({
    userReducer,
    isLoggedReducer,
    notificationReducer
})