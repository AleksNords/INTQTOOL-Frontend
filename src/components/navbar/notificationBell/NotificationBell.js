import React from "react";
import './notificationbell.css';
import NotificationsIcon from '@mui/icons-material/Notifications';
import NotificationDropDown from "../notificationDropdown/NotificationDropdown";

export default function Navbar() {
    const notifications = "9+";
    const [showDropdown, setShowDropdown] = React.useState("false");

    return (
        <div className="notificationBell">
            <NotificationsIcon className="bell" onClick={()=> setShowDropdown(!showDropdown)} sx={{fontSize: 45}}/>
            <div className="notificationBubble"><div id="notificationAmount">{notifications}</div></div>
            {showDropdown === true ? <NotificationDropDown/> : null}
        </div>
    )
}