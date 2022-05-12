import React, {useState} from "react";
import './notificationbell.css';
import NotificationsIcon from '@mui/icons-material/Notifications';
import NotificationDropDown from "../notificationDropdown/NotificationDropdown";
import {useSelector, useDispatch} from "react-redux";
import {setNotifications} from "../../../store/action/notificationAction";

/**
 * Bell icon with a notification count used to open the notification drawer
 * @returns bell element used for notifications
 */
export default function Navbar() {
    const notifications = useSelector(state => state.notificationReducer)
    const [showDropdown, setShowDropdown] = useState(false);
    const dispatch = useDispatch();


    /**
     * Deletes all notifications
     */
    function clearNotifications() {
        dispatch(setNotifications({
            notifications: []
        }))
    }

    return (
        <div className="notificationBell">
            <NotificationsIcon className={`bell ${showDropdown ? "inverted-bell" : ""}`}
                               onClick={() => setShowDropdown(!showDropdown)} sx={{fontSize: 45}}/>
            {notifications.notifications && notifications.notifications.length > 0 ?
                <div className="notificationBubble">
                    <div
                        id="notificationAmount">{(notifications.notifications.length < 10) ? notifications.notifications.length : "9+"}</div>
                </div> : null}
            {showDropdown === true ? <NotificationDropDown clearParentNotifications={clearNotifications}
                                                           setShowFunction={setShowDropdown}/> : null}
        </div>
    )
}