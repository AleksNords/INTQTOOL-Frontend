import React from 'react';
import './fullsizenotification.css';
import CheckIcon from '@mui/icons-material/Check';
import CancelIcon from '@mui/icons-material/Cancel';

import ChatBubbleIcon from "@mui/icons-material/ChatBubble";
import GradingIcon from "@mui/icons-material/Grading";
import ErrorIcon from "@mui/icons-material/Error";
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';

/**
 * Represents a larger notification meant to hold more information about the event
 * @param id of the notification
 * @param message of the notification
 * @param type of the notification
 * @param deleteNotificationFunction function used to delete a notification
 * @returns element used to represent a notification with more details than the the regular notification component
 */
export default function FullSizeNotification({notification,deleteNotificationFunction}) {

    /**
     * Renders an icon based on the notificaiton type
     * @returns icon representing the notification type
     */
    function renderIcon() {
        switch (notification.type) {
            case "question:graded":
                return <CheckIcon sx={{fontSize: 120}} className="notification-icon"/>;
            case "question:feedback":
                return <ChatBubbleIcon sx={{fontSize: 120}} className="notification-icon"/>;
            case "quiz:graded":
                return <GradingIcon sx={{fontSize: 120}} className="notification-icon"/>;
            default:
                return <ErrorIcon sx={{fontSize: 120}} className="notification-icon"/>;
        }
    }

    return (
        <div className="full-notification">
            {renderIcon()}
            <div className="notification-text-wrapper">
                <h1 className="notification-title">{notification.title ? notification.title : "An answer has been graded!"}</h1>
                <span className="notification-message">{notification.message}</span>
            </div>
            <div className="notification-top-wrapper">
                <span>2m</span>
                <CancelIcon onClick={() => deleteNotificationFunction(notification.notificationID)} sx={{fontSize: 40, cursor: "pointer"}}/>
            </div>
            <p className={"go-to-question-link"}>Go to question <ArrowForwardIosIcon sx={{fontSize: 20}}/></p>
        </div>
    )
}