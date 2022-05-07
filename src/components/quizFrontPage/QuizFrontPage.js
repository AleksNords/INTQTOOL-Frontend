import React from 'react';
import './quizFrontPage.css';
import Button from "@mui/material/Button";

/**
 * The frontpage of a quiz. Displays key information and introduces the student to the quiz
 * @param title of the quiz
 * @param description of the quiz
 * @param quizLength
 * @param startQuiz function used to start the quiz
 * @returns page representing the introduction of a quiz
 */
export default function QuizFrontPage({title, description, quizLength, startQuiz}) {
    return (
        <div className={"quiz-frontpage"}>
            <div className={"quiz-frontpage-top-content"}>
                <img className={"quiz-frontpage-header-img"} alt={"Quiz title icon"} src={"/studier_IDI_GeirMogen.jpg"}/>
                <div className={"quiz-frontpage-info-wrapper"}>
                    <h1 className={"quiz-frontpage-header"}>{title}</h1>
                    <h2>This quiz has {quizLength} Questions</h2>
                    <h2>Description:</h2>
                    <p>{description}</p>
                </div>
            </div>

            <Button variant={"contained"} className={"start-quiz-button"} onClick={()=>startQuiz(0)}>Start quiz</Button>

        </div>


    )
}