import React from 'react';
import './home.css';
import QuizCard from "../quizCard/QuizCard";

export default function Home() {




    return (
        <div className={"home"}>
            <div className={"quiz-type-navigator"}>
                <h1 className={"quiz-type-navigator-title quiz-type-navigator-title-enabled"}>Active Quizes</h1>
                <h1 className={"quiz-type-navigator-title quiz-type-navigator-title-disabled"} >Archived Quizes</h1></div>
            <div className={"quizcard-container"}>
                <QuizCard title={"Multithreading and Concurrency"}
                          progression={10}/>
                <QuizCard title={"Multithreading and Concurrency"}
                          progression={40}/>
                <QuizCard title={"Multithreading and Concurrency"}
                          progression={90}/>
                <QuizCard title={"Multithreading and Concurrency"}
                          progression={35}/>
            </div>
        </div>
    )
}