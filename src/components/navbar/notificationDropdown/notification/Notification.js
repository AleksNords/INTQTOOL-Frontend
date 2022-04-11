import React, {useEffect} from 'react';
import './notification.css';
import CheckIcon from '@mui/icons-material/Check';
import ChatBubbleIcon from '@mui/icons-material/ChatBubble';
import CancelIcon from '@mui/icons-material/Cancel';
import IconButton from '@mui/material/IconButton';
import GradingIcon from '@mui/icons-material/Grading';
import ErrorIcon from '@mui/icons-material/Error';

import {white} from '@mui/material/colors';
import {useDispatch, useSelector} from 'react-redux';
import {setUser} from "../../../../store/action/userAction";

export default function Notification({id,message,type,deleteNotificationFunction}) {

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