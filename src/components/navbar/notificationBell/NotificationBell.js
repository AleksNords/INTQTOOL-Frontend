import React, {useRef, useState} from "react";
import './notificationbell.css';
import NotificationsIcon from '@mui/icons-material/Notifications';
import NotificationDropDown from "../notificationDropdown/NotificationDropdown";
import {useSelector, useDispatch} from "react-redux";
import {setNotifications} from "../../../store/action/notificationAction";
import {Slide} from "@mui/material";

/**
 * Bell icon with a notification count used to open the notification drawer
 * @returns bell element used for notifications
 */
export default function Navbar() {
    const notifications = useSelector(state => state.notificationReducer)
    const [showDropdown, setShowDropdown] = useState(false);
    const dispatch = useDispatch();
    const bellRef = useRef(null);


    /**
     * Deletes all notifications
     */
    function clearNotifications() {
        dispatch(setNotifications({
            notifications: []
        }))
    }

    return (
        <div ref={bellRef} className="notificationBell">
            <NotificationsIcon className={`bell ${showDropdown ? "inverted-bell" : ""}`}
                               onClick={(e) => setShowDropdown(!showDropdown)} sx={{fontSize: 45}}/>
            {notifications.notifications && notifications.notifications.length > 0 ?
                <div className="notificationBubble">
                    <div
                        id="notificationAmount">{(notifications.notifications.length < 10) ? notifications.notifications.length : "9+"}</div>
                </div> : null}
            {showDropdown === true ? <NotificationDropDown bellRef={bellRef} clearParentNotifications={clearNotifications}
                                                           setShowFunction={setShowDropdown}/> : null}
        </div>
    )
}