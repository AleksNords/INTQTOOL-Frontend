import React, {useState} from "react";
import './notificationdropdown.css';
import Divider from '@mui/material/Divider';
import Button from '@mui/material/Button';
import DeleteIcon from '@mui/icons-material/Delete';
import Notification from './notification/Notification'
import {useDispatch, useSelector} from "react-redux";
import {setUser} from "../../../store/action/userAction";
import axios from "axios";
import isLoggedReducer from "../../../store/reducer/isLoggedReducer";

export default function NotificationDropDown() {

    const user = useSelector(state => state.userReducer.user);
    const isLogged = useSelector(state => state.isLoggedReducer)
    const dispatch = useDispatch();
    const [notifications, setNotifications] = useState(user.notifications);

    function clearNotifications() {
        if (notifications.length >= 1) {
            let temp = user;
            temp.notifications = [];
            dispatch(setUser({
                user:temp
            }))
            setNotifications([])
            axios({
                method: "get",
                url: "http://localhost:8080/user/clearnotifications",
                headers: {
                    "Authorization": "Bearer " + isLogged.jwtToken
                }
            })
        }
    }

    function deleteNotification(notificationID) {
        let temp = user;
        temp.notifications = temp.notifications.filter(notification => {notification = JSON.parse(notification); return notification.id !== notificationID});
        dispatch(setUser({
            user:temp
        }))
        setNotifications(temp.notifications);

        axios({
            method: "get",
            url: "http://localhost:8080/user/removenotification/"+notificationID,
            headers: {
                "Authorization": "Bearer " + isLogged.jwtToken
            }
        })
    }

    //TODO: slide animation on removing notification

    return (
        <div className="notifications">
            <div className="notification-header">
                <span
                    className="amount-text">{(notifications.length === 0) ? "No notifications" : (notifications.length === 1) ? "1 Notification" : notifications.length + " Notifications"}</span>
                <Button sx={{fontSize: 14}} className="clear-button" variant="outlined" startIcon={<DeleteIcon />} onClick={clearNotifications}>Clear</Button></div>
            <Divider color="#ffffff"/>
            {(notifications.length >= 1) ? (notifications.map((notification)=> {
                notification = JSON.parse(notification);
                return (<div><Notification key={notification.id} deleteNotificationFunction={deleteNotification} id={notification.id} message={notification.message} type={notification.type}/><Divider color="#ffffff"/></div>)})) : null}
            <a className="all-notifications">See all</a>
        </div>
    )
}
