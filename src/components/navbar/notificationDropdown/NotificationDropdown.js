import React, {useEffect, useRef} from "react";
import './notificationdropdown.css';
import Divider from '@mui/material/Divider';
import Button from '@mui/material/Button';
import DeleteIcon from '@mui/icons-material/Delete';
import Notification from './notification/Notification'
import {useDispatch, useSelector} from "react-redux";
import {useNavigate} from "react-router";
import NotificationsIcon from '@mui/icons-material/Notifications';
import axios from 'axios';
import {setNotifications} from "../../../store/action/notificationAction";

export default function NotificationDropDown({clearParentNotifications, setShowFunction}) {


    let ref = useRef();
    const navigate = useNavigate();
    const isLogged = useSelector(state => state.isLoggedReducer)
    const dispatch = useDispatch();
    const notifications = useSelector(state =>state.notificationReducer)


    function clearNotifications() {
        if (notifications.notifications.length >= 1) {
            clearParentNotifications();
            dispatch(setNotifications({
                notifications:[]
            }))
            axios({
                method: "get",
                url: process.env.REACT_APP_URL+"/user/clearnotifications",
                headers: {
                    "Authorization": "Bearer " + isLogged.jwtToken
                }
            })
        }
    }

    function deleteNotification(notificationID) {
        let temp = notifications;
        temp.notifications = temp.notifications.filter(notification => {return notification.notificationID !== notificationID});
        dispatch(setNotifications({
            notifications:temp.notifications
        }))

        axios({
            method: "get",
            url: process.env.REACT_APP_URL +"/user/removenotification/"+notificationID,
            headers: {
                "Authorization": "Bearer " + isLogged.jwtToken
            }
        })
    }

    const handleClickOutside = (event) => {
        if (ref.current && !ref.current.contains(event.target) && event.target.tagName !== "path") {
            setShowFunction(false);
        }
    };

    useEffect(() => {
        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, [ref]);

    //TODO: slide animation on removing notification
    return (
        <div ref={ref} className="notifications">
            <div className="notification-header">
                <span
                    className="amount-text">{(notifications.notifications.length === 0 || !notifications) ? "No notifications" : (notifications.notifications.length === 1) ? "1 Notification" : notifications.notifications.length + " notifications"}</span>
                <Button sx={{fontSize: 14}} className="clear-button" variant="outlined" startIcon={<DeleteIcon />} onClick={clearNotifications}>Clear</Button></div>
            <Divider color="#ffffff"/>
            {(notifications.notifications.length >= 1) ? (notifications.notifications.map((notification)=> {
                //notification = JSON.parse(notification);

                return (<div><Notification key={"notificationDropdown-"+notification.notificationID} deleteNotificationFunction={deleteNotification} id={notification.notificationID} message={notification.message} type={notification.type}/><Divider color="#ffffff"/></div>)}))
                : <div className="no-notifications">
                    <NotificationsIcon className="dark-bell" sx={{fontSize: 140}}/>
                    <span>Nothing to see here</span>
                    <span id="no-notifications-subtext">Your notifications will appear here</span>
            </div>}
            <p onClick={()=>navigate("/notifications")} className="all-notifications">See all</p>
        </div>
    )
}
