import React from 'react';
import './quizcard.css';
import {useNavigate} from "react-router";
import {useSelector} from "react-redux";
import {Tooltip} from "@mui/material";
import SettingsIcon from '@mui/icons-material/Settings';

/**
 * Card representing a quiz
 * @param title of the quiz
 * @param progression of the student on the quiz
 * @param quizId
 * @param status of the quiz
 * @param userNavigateTo decides where the user is redirected upon clicking the card
 * @param grading received on the quiz
 * @returns card element used to represent a quiz
 */
function QuizCard({title, progression, quizId, status, userNavigateTo, grading, quizLength}) {

    const navigate = useNavigate();
    const user = useSelector(state => state.userReducer.user);

    return (
        <div key={quizId} className={"quizcard"}>
            <div className={"quizcard-img-wrapper"}>
                <img src={"/studier_IDI_GeirMogen.jpg"} alt="Quiz title" className={"card-image"}/>
                {user.roles && (user.roles.includes("ROLE_ADMIN") || user.roles.includes("ROLE_TEACHER")) ?
                    <Tooltip title={<span
                        className={"quiz-card-edit-tooltip"}>Edit quiz</span>}><SettingsIcon
                        className={"quiz-card-edit-quiz-icon"} sx={{fontSize: "3rem", color: "white"}}
                        onClick={() => navigate("/quizeditor/" + quizId)}/></Tooltip> : null}
            </div>
            <div className={"quizcard-info-wrapper"}
                 onClick={() => (user.roles.includes("ROLE_ADMIN") || user.roles.includes("ROLE_TEACHER")) ? navigate("/quizgrader/" + quizId) : navigate("/" + userNavigateTo + "/" + quizId)}>
                <h2 className={"quizcard-title"}>{title}</h2>

                {progression !== undefined ? (<span className={"quizcard-subtext-span"}><p
                        className={"quizcard-question-amnt"}>{quizLength} Questions</p><p
                        className={"quizcard-continue"}>{user.roles && (user.roles.includes("ROLE_ADMIN") || user.roles.includes("ROLE_TEACHER")) ? "grade" : "start"} →</p></span>)
                    : (status !== undefined) ? (<span className={"quizcard-subtext-span"}><h3
                        className={"quizcard-status"}>Status: {status} {status === "graded" && grading ? grading : null}</h3><p
                        className={"quizcard-continue"}>show →</p></span>) : null
                }


            </div>
        </div>
    )
}

export default QuizCard;