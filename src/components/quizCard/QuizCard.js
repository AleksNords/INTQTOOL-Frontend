import React from 'react';
import './quizcard.css';
import {useNavigate} from "react-router";
import {useSelector} from "react-redux";

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
        <div key={quizId} className={"quizcard"}
             onClick={() => (user.roles.includes("ROLE_ADMIN") || user.roles.includes("ROLE_TEACHER")) ? navigate("/quizgrader/" + quizId) : navigate("/" + userNavigateTo + "/" + quizId)}>
            <div className={"quizcard-img-wrapper"}>
                <img src={"/studier_IDI_GeirMogen.jpg"} alt="Quiz title" className={"card-image"}/>
            </div>
            <div className={"quizcard-info-wrapper"}>
                <h2 className={"quizcard-title"}>{title}</h2>

                {progression !== undefined ? (<span className={"quizcard-subtext-span"}><p
                        className={"quizcard-question-amnt"}>{quizLength} Questions</p><p
                        className={"quizcard-continue"}>{user.roles.includes("ROLE_ADMIN") || user.roles.includes("ROLE_TEACHER") ? "grade" : "start"} →</p></span>)
                    : (status !== undefined) ? (<span className={"quizcard-subtext-span"}><h3
                        className={"quizcard-status"}>Status: {status} {status === "graded" && grading ? grading : null}</h3><p
                        className={"quizcard-continue"}>show →</p></span>) : null
                }


            </div>
        </div>
    )
}

export default QuizCard;