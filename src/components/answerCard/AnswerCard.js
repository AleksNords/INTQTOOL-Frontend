import React, {useState} from 'react';
import './answercard.css';
import {Button, Checkbox} from "@mui/material";
import ContentCopyIcon from '@mui/icons-material/ContentCopy';

export default function AnswerCard({answer, setCheckedFunction, setCurrentAnswerFunction, isGraded}) {

    const [buttonText, setButtonText] = useState("Copy Feedback");

    const handleCheckboxChange = (event) => {
        setCheckedFunction(answer.id, event.target.checked);
    };

    function handleCopyFeedback(event) {
        navigator.clipboard.writeText(answer.feedback);
        setButtonText("Copied!");

        setTimeout(function() {
            setButtonText("Copy Feedback");
        }, 3000);
    }

    return (
        <div className={"answer-card " + (isGraded ? "is-graded" : undefined)}>
            {!isGraded ?
                <div className="answer-card-top-interactable-wrapper">
                    <Checkbox key={answer.id} onChange={handleCheckboxChange} className="answer-select-checkbox" sx={{ '& .MuiSvgIcon-root': { fontSize: 28 } }} size="large"/>
                    <Button onClick={() => setCurrentAnswerFunction(answer.id)} className="select-answer-button" size="large" variant="contained" sx={{color: "white", fontSize: 12}}>Select</Button>
                </div>
                : <div className="answer-card-top-interactable-wrapper">
                <Button onClick={(e) => handleCopyFeedback(e)} startIcon={<ContentCopyIcon/>} className="copy-feedback-button" size="large" variant="contained" sx={{color: "white", fontSize: 12}}>{buttonText}</Button>
                    <Button onClick={() => setCurrentAnswerFunction(answer.id)} className="select-answer-button" size="large" variant="contained" sx={{color: "white", fontSize: 12}}>Select</Button>
                </div>
                    }
            <p className="student-answer-text" onClick={() => setCurrentAnswerFunction(answer.id)}>{answer.answer}</p>
        </div>
    )
}