import React from 'react';
import './quizNavigation.css';
import SaveIcon from '@mui/icons-material/Save';
import {Button} from "@mui/material";

/**
 * Element used to navigate a quiz and perform key actions like submitting or viewing results
 * @param currentQuestion the current question being viewed
 * @param setCurrentQuestion function used to set the current question
 * @param quizLength
 * @param endQuiz function called when the "Next" button is clicked at the end of a quiz
 * @param saveFunction function used to save student answers
 * @returns navigation buttons for quizzes
 */
export default function QuizNavigation({currentQuestion, setCurrentQuestion, quizLength, endQuiz, saveFunction}) {

    /**
     * Creates a button for quiz navigation
     * @param clickHandler The function to call on click
     * @param text The text to show on the button
     * @param icon optional icon to show
     * @returns button element with provided properties
     */
    function createNavigationButton(text, clickHandler, icon) {
        return <Button startIcon={icon} className="quiz-nav-button" onClick={clickHandler}
                       variant="contained">{text}</Button>;
    }

    let previousButton;
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