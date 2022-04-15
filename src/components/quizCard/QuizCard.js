import React from 'react';
import './quizcard.css';
import {LinearProgress} from "@mui/material";
import {useNavigate} from "react-router";

function QuizCard({title, progression, quizId,status}) {
    const navigate = useNavigate();

    return (
        <div key={quizId} className={"quizcard"} onClick={() => navigate("/quiz/" + quizId)}>
            <div className={"quizcard-img-wrapper"}>
                <img src={"/studier_IDI_GeirMogen.jpg"} alt="Quiz title-image" className={"card-image"}/>
            </div>
            <div className={"quizcard-info-wrapper"}>
                <h2 className={"quizcard-title"}>{title}</h2>

                    {progression !== undefined ? (<span className={"quizcard-subtext-span"}><LinearProgress value={progression} variant={"determinate"}
                                                                  className={"quizcard-progressionbar"}/><a className={"quizcard-continue"}>continue →</a></span>)
                        :(status !== undefined) ? (<span className={"quizcard-subtext-span"}><h3 className={"quizcard-status"}>Status: {status}</h3><a className={"quizcard-continue"}>show →</a></span>):null
                    }


            </div>
        </div>
    )
}

export default QuizCard;