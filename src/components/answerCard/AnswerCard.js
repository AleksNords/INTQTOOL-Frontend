import React, {useState} from 'react';
import './answercard.css';
import {Button, Checkbox} from "@mui/material";
import ContentCopyIcon from '@mui/icons-material/ContentCopy';

/**
 * Answer card component used in the grading interface for teachers
 * @param answer object representing the answer
 * @param setCheckedFunction function that sets the answer as checked to prepare it for a batch grade
 * @param setCurrentAnswerFunction function that sets the current answer in a parent element
 * @param isGraded bool that represents the grading status of the answer
 * @returns A card representing a student answer
 */
export default function AnswerCard({answer, setCheckedFunction, setCurrentAnswerFunction, isGraded}) {

    const [buttonText, setButtonText] = useState("Copy Feedback");

    const handleCheckboxChange = (event) => {
        setCheckedFunction(answer.id, event.target.checked);
    };

    /**
     * Copies the feedback given to an answer to the user clipboard. Gives temporary feedback on the button
     */
    function handleCopyFeedback() {
        navigator.clipboard.writeText(answer.feedback).then(()=> setButtonText("Copied!"));

        setTimeout(function() {
            setButtonText("Copy Feedback");
        }, 3000);
    }

    return (
        <div key={"answerCard-"+answer.id} className={"answer-card " + (isGraded ? "is-graded" : undefined)}>
            {!isGraded ?
                <div className="answer-card-top-interactable-wrapper">
                    <Checkbox key={answer.id} onChange={handleCheckboxChange} className="answer-select-checkbox" sx={{ '& .MuiSvgIcon-root': { fontSize: 28 } }} size="large"/>
                    <Button onClick={() => setCurrentAnswerFunction(answer.id)} className="select-answer-button" size="large" variant="contained" sx={{color: "white", fontSize: 12}}>Select</Button>
                </div>
                : <div className="answer-card-top-interactable-wrapper">
                <Button onClick={() => handleCopyFeedback()} startIcon={<ContentCopyIcon/>} className="copy-feedback-button" size="large" variant="contained" sx={{color: "white", fontSize: 12}}>{buttonText}</Button>
                    <Button onClick={() => setCurrentAnswerFunction(answer.id)} className="select-answer-button" size="large" variant="contained" sx={{color: "white", fontSize: 12}}>Select</Button>
                </div>
                    }
            <p className="student-answer-text" onClick={() => setCurrentAnswerFunction(answer.id)}>{answer.answer}</p>
        </div>
    )
}