import React, {useState} from "react";
import './notificationbell.css';
import NotificationsIcon from '@mui/icons-material/Notifications';
import NotificationDropDown from "../notificationDropdown/NotificationDropdown";
import {useSelector, useDispatch} from "react-redux";
import {setUser} from "../../../store/action/userAction";

export default function Navbar() {
    const user = useSelector(state => state.userReducer.user);
    const [showDropdown, setShowDropdown] = React.useState(false);
    const dispatch = useDispatch();

    function clearNotifications() {
        let temp = user;
        temp.notifications = [];
        dispatch(setUser({
            user:temp
        }))
    }

    return (
        <div className="notificationBell">
            <NotificationsIcon className={`bell ${showDropdown ? "inverted-bell" : ""}`} onClick={()=> setShowDropdown(!showDropdown)} sx={{fontSize: 45}}/>
            {user.notifications && user.notifications.length > 0 ?
                <div className="notificationBubble"><div id="notificationAmount">{(user.notifications.length < 10) ? user.notifications.length : "9+"}</div></div> : null}
            {showDropdown === true ? <NotificationDropDown clearParentNotifications={clearNotifications}/> : null}
        </div>
    )
}