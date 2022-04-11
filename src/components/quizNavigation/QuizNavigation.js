import React from 'react';
import './quizNavigation.css';
import SaveIcon from '@mui/icons-material/Save';

export default function QuizNavigation({currentQuestion, setCurrentQuestion, quizLength, endQuiz, saveFunction}) {

    return (
        <div className={"quiz-navigation"}>
            {
                (currentQuestion === 0) ? (
                    <div className={"quiz-navigation-button-container"}>
                        <button className={"quiz-nav-button"}
                                onClick={() => setCurrentQuestion(-1)}>Frontpage</button>
                        <button className={"quiz-nav-button"} onClick={()=>saveFunction()}><SaveIcon color={"white"}/>Save</button>
                    <button className={"quiz-nav-button"}
                            onClick={() => setCurrentQuestion(currentQuestion + 1)}>Next</button>
                    </div>
                ):(currentQuestion === quizLength-1) ? (
                    <div className={"quiz-navigation-button-container"}>
                        <button className={"quiz-nav-button"}
                                onClick={() => setCurrentQuestion(currentQuestion - 1)}>Previous</button>
                        <button className={"quiz-nav-button"} onClick={()=>saveFunction()}><SaveIcon color={"white"}/>Save</button>
                    <button className={"quiz-nav-button"} onClick={()=>endQuiz()}>Submit</button>
                </div>
                ):(
                    <div className={"quiz-navigation-button-container"}>
                        <button className={"quiz-nav-button"}
                                onClick={() => setCurrentQuestion(currentQuestion - 1)}>Previous</button>
                        <button className={"quiz-nav-button"}
                                onClick={()=>saveFunction()}><SaveIcon color={"white"}/>Save</button>

                        <button className={"quiz-nav-button"}
                                onClick={() => setCurrentQuestion(currentQuestion + 1)}>Next</button>

                    </div>
                )
            }

        </div>
    )
}