import React from 'react';
import './quizcard.css';
import {LinearProgress} from "@mui/material";
import {useNavigate} from "react-router";
import {useSelector} from "react-redux";

function QuizCard({title, progression, quizId,status, userNavigateTo, grading}) {
    const navigate = useNavigate();

    const user = useSelector(state => state.userReducer.user);

    return (
        <div key={quizId} className={"quizcard"} onClick={() => (user.roles.includes("ROLE_ADMIN") || user.roles.includes("ROLE_TEACHER")) ? navigate("/quizgrader/" + quizId):navigate("/" + userNavigateTo + "/" + quizId)}>
            <div className={"quizcard-img-wrapper"}>
                <img src={"/studier_IDI_GeirMogen.jpg"} alt="Quiz title" className={"card-image"}/>
            </div>
            <div className={"quizcard-info-wrapper"}>
                <h2 className={"quizcard-title"}>{title}</h2>

                    {progression !== undefined ? (<span className={"quizcard-subtext-span"}><LinearProgress value={progression} variant={"determinate"}
                                                                  className={"quizcard-progressionbar"}/><p className={"quizcard-continue"}>continue →</p></span>)
                        :(status !== undefined) ? (<span className={"quizcard-subtext-span"}><h3 className={"quizcard-status"}>Status: {status} {status === "graded" && grading ? grading:null}</h3><p className={"quizcard-continue"}>show →</p></span>):null
                    }


            </div>
        </div>
    )
}

export default QuizCard;