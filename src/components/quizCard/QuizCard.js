import React from 'react';
import './quizcard.css';
import {LinearProgress} from "@mui/material";

function QuizCard({title,progression}){

    return(
        <div className={"quizcard"}>
            <img src={"/studier_IDI_GeirMogen.jpg"} className={"card-image"}/>
            <div className={"quizcard-info-wrapper"}>
                <h2 className={"quizcard-title"}>{title}</h2><br/>
                <LinearProgress  value={progression} variant={"determinate"} className={"quizcard-progressionbar"}/>
                <a className={"quizcard-continue"}>continue →</a>
            </div>
        </div>
    )
}

export default QuizCard;