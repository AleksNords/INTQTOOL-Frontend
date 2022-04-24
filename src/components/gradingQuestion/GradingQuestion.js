import React, {useEffect, useState} from 'react';
import './gradingquestion.css';
import {Button, FormControlLabel, Radio, RadioGroup, TextField} from "@mui/material";
import CheckIcon from "@mui/icons-material/Check";
import CloseIcon from "@mui/icons-material/Close";
import PercentIcon from "@mui/icons-material/Percent";
import SendIcon from '@mui/icons-material/Send';

export default function GradingQuestion({question, questionIndex, currentAnswer}) {

    return (
            <div className="grading-question">
                <h2 className="question-text">Question {questionIndex}: {question ? question.question : null} </h2>
                <TextField key={questionIndex + currentAnswer} sx={{".MuiOutlinedInput-notchedOutline": {borderColor: "#000000"}}} className="answer-text" multiline rows={6} value={currentAnswer ? currentAnswer.answer : ""} label="Student answer" InputLabelProps={{style: {fontSize: 18, color: "black"}}} InputProps={{style: {fontSize: 18}, readOnly: true}}/>
                <TextField className={"feedback-text"} multiline rows={6} label="Feedback" InputLabelProps={{style: {fontSize: 18}}} InputProps={{style: {fontSize: 18}}}/>
                <RadioGroup key={"grading" + questionIndex} className="credit-radio-wrapper" row>
                    <span className="credit-label">Choose credit:</span>
                    <FormControlLabel className="grading-button" value="correct" control={<Radio TouchRippleProps={{sx: {color: "#42c767"}}} className="grading-radio" icon={<CheckIcon sx={{fontSize: 50}}/>} checkedIcon={<CheckIcon sx={{fontSize: 50, color: "#42c767"}}/>} size={"large"}/>}/>
                    <FormControlLabel className="grading-button" value="incorrect" control={<Radio TouchRippleProps={{sx: {color: "#F63E3E"}}} className="grading-radio" icon={<CloseIcon sx={{fontSize: 50}}/>} checkedIcon={<CloseIcon sx={{fontSize: 50, color: "#f63e3e"}}/>} size={"large"}/>}/>
                    <FormControlLabel className="grading-button" value="partly_correct" control={<Radio TouchRippleProps={{sx: {color: "#F0C11B"}}} className="grading-radio" icon={<PercentIcon sx={{fontSize: 50}}/>} checkedIcon={<PercentIcon sx={{fontSize: 50, color: "#f0c11b"}}/>} size={"large"}/>}/>
                </RadioGroup>
                <Button endIcon={<SendIcon/>} variant="contained" className="submit-feedback-button" sx={{fontSize: 18, backgroundColor: "#42C767", ":hover": {backgroundColor: "#40AA5A"}}} size="large">Submit feedback</Button>
            </div>
    )
}