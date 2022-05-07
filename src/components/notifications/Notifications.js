import React, {useState} from 'react';
import './notifications.css';
import {useDispatch, useSelector} from "react-redux";
import Divider from "@mui/material/Divider";
import Button from "@mui/material/Button";
import DeleteIcon from "@mui/icons-material/Delete";
import FullSizeNotification from "./fullsizeNotification/FullsizeNotification";
import {setUser} from "../../store/action/userAction";
import NotificationsIcon from '@mui/icons-material/Notifications';
import axios from "axios";
import {setNotifications} from "../../store/action/notificationAction";

/**
 * Notification page housing larger versions of the notifications found in the notification drawer
 * @returns Page housing all the user notifications in a larger format than the notificaiton drawer
 */
export default function Notifications() {

    const notifications = useSelector(state => state.notificationReducer);
    const user = useSelector(state => state.userReducer.user);
    //const navigate = useNavigate();
    const isLogged = useSelector(state => state.isLoggedReducer)
    const dispatch = useDispatch();

    /**
     * Clears the user notifications
     */
    function clearNotifications() {
        if (notifications.length >= 1) {

            dispatch(setNotifications({
                notifications:[]
            }))
            setNotifications([])
            axios({
                method: "get",
                url: process.env.REACT_APP_URL + "/user/clearnotifications",
                headers: {
                    "Authorization": "Bearer " + isLogged.jwtToken
                }
            })
        }
    }

    /**
     * Deletes a single user notification
     * @param notificationID
     */
    function deleteNotification(notificationID) {
        let temp = notifications;
        temp.notifications = temp.notifications.filter(notification => {return notification.notificationID !== notificationID});
        dispatch(setNotifications({
            notifications:temp.notifications
        }))
        setNotifications(temp.notifications);

        axios({
            method: "get",
            url: process.env.REACT_APP_URL + "/user/removenotification/"+notificationID,
            headers: {
                "Authorization": "Bearer " + isLogged.jwtToken
            }
        })
    }

    return (
        <div className="notifications-page">
            <div className="notification-title-wrapper">
                <h1 className="notifications-title">Notifications ({notifications.notifications.length})</h1>
                <Button onClick={clearNotifications} sx={{fontSize: 14}} className="clear-notification-button" variant="contained" startIcon={<DeleteIcon/>}>Clear</Button>
            </div>
            <Divider className="main-divider" color="#1C5BA5"/>
            <div className="notification-wrapper">
                {(notifications.notifications.length >= 1) ? (notifications.notifications.map((notification)=> {
                        //notification = JSON.parse(notification);
                        return (<FullSizeNotification key={notification.notificationID} deleteNotificationFunction={deleteNotification} id={notification.notificationID} message={notification.message} type={notification.type}/>)}))
                    : <div className="no-notifications-big">
                        <NotificationsIcon className="grey-bell" sx={{fontSize: 250}}/>
                        <span className="nothing-to-see">Nothing to see here</span>
                        <span className="no-notifications-subtext">Your notifications will appear here</span>
                    </div>}
            </div>
        </div>
    )
}