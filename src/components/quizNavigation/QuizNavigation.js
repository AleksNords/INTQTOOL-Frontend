import React from 'react';
import './quizNavigation.css';
import SaveIcon from '@mui/icons-material/Save';
import {Button} from "@mui/material";

export default function QuizNavigation({currentQuestion, setCurrentQuestion, quizLength, endQuiz, saveFunction}) {

    //TODO - here you have some duplication. You display some buttons based on logic, but some buttons are displayed in several cases
    //return (
    //    <div className={"quiz-navigation"}>
    //        {
    //            // See suggested refactored code
    //            (currentQuestion === 0 && quizLength>1) ? (
    //                <div className={"quiz-navigation-button-container"}>
    //                    <button className={"quiz-nav-button"}
    //                            onClick={() => setCurrentQuestion(-1)}>Frontpage</button>
    //                    <button className={"quiz-nav-button"} onClick={()=>saveFunction()}><SaveIcon color={"white"}/>Save</button>
    //                <button className={"quiz-nav-button"}
    //                        onClick={() => setCurrentQuestion(currentQuestion + 1)}>Next</button>
    //                </div>
    //            ):(currentQuestion === quizLength-1) ? (
    //                <div className={"quiz-navigation-button-container"}>
    //                    <button className={"quiz-nav-button"}
    //                            onClick={() => setCurrentQuestion(currentQuestion - 1)}>Previous</button>
    //                    <button className={"quiz-nav-button"} onClick={()=>saveFunction()}><SaveIcon color={"white"}/>Save</button>
    //                <button className={"quiz-nav-button"} onClick={()=>endQuiz()}>Submit</button>
    //            </div>
    //            ):(
    //                <div className={"quiz-navigation-button-container"}>
    //                    <button className={"quiz-nav-button"}
    //                            onClick={() => setCurrentQuestion(currentQuestion - 1)}>Previous</button>
    //                    <button className={"quiz-nav-button"}
    //                            onClick={()=>saveFunction()}><SaveIcon color={"white"}/>Save</button>
////
    //                    <button className={"quiz-nav-button"}
    //                            onClick={() => setCurrentQuestion(currentQuestion + 1)}>Next</button>
////
    //                </div>
    //            )
////
    //        }
////
    //    </div>
    //)

    /**
     * Create a button for quiz navigation
     * @param clickHandler The function to call on click
     * @param text The text to show on the button
     * @param icon optional icon to show
     * @returns {JSX.Element}
     */
    function createNavigationButton(text, clickHandler, icon) {
        return <Button startIcon={icon} className="quiz-nav-button" onClick={clickHandler} variant="contained">{text}</Button>;
    }

    let previousButton = null;
    let nextButton = null;
    let submitButton = null;
    let saveButton = createNavigationButton("Save", saveFunction, <SaveIcon/>);


    let prevButtonText = currentQuestion === 0 ? "Frontpage" : "Previous";
    previousButton = createNavigationButton(prevButtonText, () => setCurrentQuestion(currentQuestion - 1), null);

    if (currentQuestion < quizLength - 1) {
        nextButton = createNavigationButton("Next", () => setCurrentQuestion(currentQuestion + 1), null);
    } else {
        submitButton = createNavigationButton(saveFunction ? "Submit" : "Results", endQuiz, null);
    }

    return (
        <div className={"quiz-navigation"}>
            <div className="quiz-navigation-button-container">
                {previousButton}
                {saveFunction ? saveButton : null}
                {nextButton}
                {submitButton ? submitButton : null}
            </div>
        </div>
    )
}