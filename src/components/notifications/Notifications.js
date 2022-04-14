import React, {useEffect, useState} from 'react';
import './notifications.css';
import {useDispatch, useSelector} from "react-redux";
import {useNavigate} from "react-router";
import Divider from "@mui/material/Divider";
import Button from "@mui/material/Button";
import DeleteIcon from "@mui/icons-material/Delete";
import FullSizeNotification from "./fullsizeNotification/FullsizeNotification";
import {setUser} from "../../store/action/userAction";
import NotificationsIcon from '@mui/icons-material/Notifications';

export default function Notifications() {

    const user = useSelector(state => state.userReducer.user);
    const navigate = useNavigate();
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
            /*axios({
                method: "get",
                url: "https://quiz.web-tek.ninja:8080/user/clearnotifications",
                headers: {
                    "Authorization": "Bearer " + isLogged.jwtToken
                }
            })*/
        }
    }

    function deleteNotification(notificationID) {
        let temp = user;
        temp.notifications = temp.notifications.filter(notification => {notification = JSON.parse(notification); return notification.id !== notificationID});
        dispatch(setUser({
            user:temp
        }))
        setNotifications(temp.notifications);

        /*axios({
            method: "get",
            url: "https://quiz.web-tek.ninja:8080/user/removenotification/"+notificationID,
            headers: {
                "Authorization": "Bearer " + isLogged.jwtToken
            }
        })*/
    }

    return (
        <div className="notifications-page">
            <div className="notification-title-wrapper">
                <h1 className="notifications-title">Notifications ({notifications.length})</h1>
                <Button onClick={clearNotifications} sx={{fontSize: 14}} className="clear-notification-button" variant="contained" startIcon={<DeleteIcon/>}>Clear</Button>
            </div>
            <Divider className="main-divider" color="#1C5BA5"/>
            <div className="notification-wrapper">
                {(notifications.length >= 1) ? (notifications.map((notification)=> {
                        notification = JSON.parse(notification);
                        return (<FullSizeNotification key={notification.id} deleteNotificationFunction={deleteNotification} id={notification.id} message={notification.message} type={notification.type}/>)}))
                    : <div className="no-notifications-big">
                        <NotificationsIcon className="grey-bell" sx={{fontSize: 250}}/>
                        <span className="nothing-to-see">Nothing to see here</span>
                        <span className="no-notifications-subtext">Your notifications will appear here</span>
                    </div>}
            </div>
        </div>
    )
}