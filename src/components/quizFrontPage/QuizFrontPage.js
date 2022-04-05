import React from 'react';
import './quizFrontPage.css';

export default function QuizFrontPage({title, description, quizLength, startQuiz}) {
    console.log(quizLength)
    return (
        <div className={"quiz-frontpage"}>
            <div className={"quiz-frontpage-top-content"}>
                <img className={"quiz-frontpage-header-img"} src={"/studier_IDI_GeirMogen.jpg"}/>
                <div className={"quiz-frontpage-info-wrapper"}>
                    <h1 className={"quiz-frontpage-header"}>{title}</h1>
                    <h2>This quiz has {quizLength} Questions</h2>
                    <h2>Description:</h2>
                    <p>{description}</p>
                </div>
            </div>

            <button className={"start-quiz-button"} onClick={()=>startQuiz(0)}>Start quiz</button>

        </div>


    )
}