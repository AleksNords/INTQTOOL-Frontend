import React from 'react';
import './fullsizenotification.css';
import CheckIcon from '@mui/icons-material/Check';
import CancelIcon from '@mui/icons-material/Cancel';

import ChatBubbleIcon from "@mui/icons-material/ChatBubble";
import GradingIcon from "@mui/icons-material/Grading";
import ErrorIcon from "@mui/icons-material/Error";
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';

export default function FullSizeNotification({id, message, type, deleteNotificationFunction}) {

    function renderIcon() {
        switch (type) {
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
                <h1 className="notification-title">{message ? message : "An answer has been graded!"}</h1>
                <span className="notification-message">Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the</span>
                <span className="notification-detail"><span className="notification-qaf">Q: </span>Hva er applikasjonsutvikling?</span>
                <span className="notification-detail"><span className="notification-qaf">A: </span>Ett kjedelig fag på skolen</span>
                <span className="notification-detail"><span className="notification-qaf">Feedback: </span>None</span>
            </div>
            <div className="notification-top-wrapper">
                <span>2m</span>
                <CancelIcon onClick={() => deleteNotificationFunction(id)} sx={{fontSize: 40, cursor: "pointer"}}/>
            </div>
            <a>Go to question <ArrowForwardIosIcon sx={{fontSize: 20}}/></a>
        </div>
    )
}