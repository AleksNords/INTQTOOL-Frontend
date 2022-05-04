import React, {useState} from "react";
import './notificationdropdown.css';
import Divider from '@mui/material/Divider';
import Button from '@mui/material/Button';
import DeleteIcon from '@mui/icons-material/Delete';
import Notification from './notification/Notification'
import {useDispatch, useSelector} from "react-redux";
import {setUser} from "../../../store/action/userAction";
import {useNavigate} from "react-router";
import NotificationsIcon from '@mui/icons-material/Notifications';
import axios from 'axios';
import {setNotifications} from "../../../store/action/notificationAction";

export default function NotificationDropDown({clearParentNotifications}) {


    const navigate = useNavigate();
    const dispatch = useDispatch();
    const notifications = useSelector(state =>state.notificationReducer)
    const url = "https://quiz.web-tek.ninja:8443";

    function clearNotifications() {
        if (notifications.notifications.length >= 1) {
            clearParentNotifications();
            dispatch(setNotifications({
                notifications:[]
            }))
            /*axios({
                method: "get",
                url: url+"/user/clearnotifications",
                headers: {
                    "Authorization": "Bearer " + isLogged.jwtToken
                }
            })*/
        }
    }

    function deleteNotification(notificationID) {
        let temp = notifications;
        temp.notifications = temp.notifications.filter(notification => {notification = JSON.parse(notification); return notification.id !== notificationID});
        dispatch(setUser({
            user:temp
        }))

        /*axios({
            method: "get",
            url: url+"/user/removenotification/"+notificationID,
            headers: {
                "Authorization": "Bearer " + isLogged.jwtToken
            }
        })*/
    }

    //TODO: slide animation on removing notification

    return (
        <div className="notifications">
            <div className="notification-header">
                <span
                    className="amount-text">{(notifications.notifications.length === 0) ? "No notifications" : (notifications.notifications.length === 1) ? "1 Notification" : notifications.notifications.length + " notifications"}</span>
                <Button sx={{fontSize: 14}} className="clear-button" variant="outlined" startIcon={<DeleteIcon />} onClick={clearNotifications}>Clear</Button></div>
            <Divider color="#ffffff"/>
            {(notifications.notifications.length >= 1) ? (notifications.notifications.map((notification)=> {
                //notification = JSON.parse(notification);
                return (<div><Notification key={notification.id} deleteNotificationFunction={deleteNotification} id={notification.id} message={notification.message} type={notification.type}/><Divider color="#ffffff"/></div>)}))
                : <div className="no-notifications">
                    <NotificationsIcon className="dark-bell" sx={{fontSize: 140}}/>
                    <span>Nothing to see here</span>
                    <span id="no-notifications-subtext">Your notifications will appear here</span>
            </div>}
            <a onClick={()=>navigate("/notifications")} className="all-notifications">See all</a>
        </div>
    )
}
