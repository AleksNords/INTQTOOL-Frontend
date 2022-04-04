import React from 'react';
import './quizcard.css';
import {LinearProgress} from "@mui/material";
import {useNavigate} from "react-router";

function QuizCard({title,progression,quizId}){
    const navigate = useNavigate();

    return(
        <div className={"quizcard"} onClick={()=>navigate("/quiz/"+quizId)}>
            <img src={"/studier_IDI_GeirMogen.jpg"} className={"card-image"}/>
            <div className={"quizcard-info-wrapper"}>
                <h2 className={"quizcard-title"}>{title}</h2><br/>
                <span className={"quizcard-subtext-span"}><LinearProgress  value={progression} variant={"determinate"} className={"quizcard-progressionbar"}/>
                <a className={"quizcard-continue"}>continue →</a> </span>
            </div>
        </div>
    )
}

export default QuizCard;