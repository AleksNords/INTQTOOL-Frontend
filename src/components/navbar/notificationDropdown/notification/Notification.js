import React from 'react';
import './notification.css';
import CheckIcon from '@mui/icons-material/Check';
import ChatBubbleIcon from '@mui/icons-material/ChatBubble';
import CancelIcon from '@mui/icons-material/Cancel';
import IconButton from '@mui/material/IconButton';
import GradingIcon from '@mui/icons-material/Grading';
import ErrorIcon from '@mui/icons-material/Error';

/**
 * Represents a single notification used in the smaller drawer format
 * @param id of the notification
 * @param message provided in the notification
 * @param type of the notification
 * @param deleteNotificationFunction function used to delete the notification
 * @returns single notification element
 */
export default function Notification({id,message,type,deleteNotificationFunction}) {

    /**
     * Renders an icon based on the notificaiton type
     * @returns icon representing the notification type
     */
    function renderIcon() {
        switch (type) {
            case "question:graded":
                return <CheckIcon sx={{fontSize: 50}} className="checkicon"/>;
            case "question:feedback":
                return <ChatBubbleIcon sx={{fontSize: 50}} className="checkicon"/>;
            case "quiz:graded":
                return <GradingIcon sx={{fontSize: 50}} className="checkicon"/>;
            default:
                return <ErrorIcon sx={{fontSize: 50}} className="checkicon"/>;
        }
    }

    return (
        <div className="notification">
            {renderIcon()}
            <div className="text-wrapper">
                <p className="title">{message}</p>
                <p className="message">Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the</p>
            </div>
            <div className="end-wrapper">
            <span className="notification-time">2m</span>
                <IconButton onClick={()=>deleteNotificationFunction(id)} className="notification-delete-wrapper"><CancelIcon id="delete-icon" sx={{fontSize: 25}}/></IconButton>
            </div>
        </div>
    )
}