import React from 'react';
import './answercard.css';
import {Button, Checkbox} from "@mui/material";

export default function AnswerCard({answer, setCheckedFunction, setCurrentAnswerFunction}) {

    const handleCheckboxChange = (event) => {
        setCheckedFunction(answer.id, event.target.checked);
    };

    return (
        <div className="answer-card">
            <div className="answer-card-top-interactable-wrapper">
                <Checkbox key={answer.id} onChange={handleCheckboxChange} className="answer-select-checkbox" sx={{ '& .MuiSvgIcon-root': { fontSize: 28 } }} size="large"/>
                <Button onClick={() => setCurrentAnswerFunction(answer.id)} className="select-answer-button" size="large" variant="contained" sx={{color: "white", fontSize: 12}}>Select</Button>
            </div>
            <p className="student-answer-text" onClick={() => setCurrentAnswerFunction(answer.id)}>{answer.answer}</p>
        </div>
    )
}