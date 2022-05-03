import React, {useEffect, useState} from 'react';
import './quizfeedback.css';
import QuestionBanner from "../questionBanner/QuestionBanner";
import axios from "axios";
import {Navigate, useParams} from "react-router";
import {useSelector} from "react-redux";
import {TextField} from "@mui/material";
import CheckIcon from '@mui/icons-material/Check';
import QuizNavigation from "../quizNavigation/QuizNavigation";

export default function QuizFeedback() {

    const [currentQuestion, setCurrentQuestion] = useState(0);

    return (
        <div className="feedback-quiz">
            {/*{loading ?
                <div className="loading-overlay">
                    <CircularProgress className={"loading"}/>
                </div>
                : null}*/}
            <QuestionBanner currentQuestion={currentQuestion}
                            quizLength={1}
                            setCurrentQuestion={setCurrentQuestion}/>
            <h1 className="feedback-question-number">Question {currentQuestion + 1}</h1>
            <h2 className="feedback-question-title">Hva står Http for?</h2>
            <div className="feedback-textfield-wrapper">
                <TextField value="HyperText Transfer Protocol" multiline rows={7} label="Your answer" className="feedback-textfield" InputLabelProps={{style: {fontSize: 24}}} InputProps={{style: {fontSize: 24}, readOnly: true}}/>
                <TextField value={"Dette stemmer! Kjempebra!"} multiline rows={7} label="Feedback" className="feedback-textfield" InputLabelProps={{style: {fontSize: 24}}} InputProps={{style: {fontSize: 24}, readOnly: true}}/>
            </div>
            <span className="feedback-correct"><CheckIcon sx={{fontSize: 50, fontWeight: "900"}}/>Correct!</span>
            <QuizNavigation quizLength={1} setCurrentQuestion={setCurrentQuestion}
                            currentQuestion={currentQuestion} endQuiz={null}
                            saveFunction={null}/>
        </div>
    )
}