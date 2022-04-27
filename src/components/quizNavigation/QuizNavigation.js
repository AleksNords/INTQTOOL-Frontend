import React from 'react';
import './quizNavigation.css';
import SaveIcon from '@mui/icons-material/Save';

export default function QuizNavigation({currentQuestion, setCurrentQuestion, quizLength, endQuiz, saveFunction}) {

    // TODO - here you have some duplication. You display some buttons based on logic, but some buttons are displayed in several cases
    // return (
    //     <div className={"quiz-navigation"}>
    //         {
    //             // See suggested refactored code
    //             (currentQuestion === 0 && quizLength>1) ? (
    //                 <div className={"quiz-navigation-button-container"}>
    //                     <button className={"quiz-nav-button"}
    //                             onClick={() => setCurrentQuestion(-1)}>Frontpage</button>
    //                     <button className={"quiz-nav-button"} onClick={()=>saveFunction()}><SaveIcon color={"white"}/>Save</button>
    //                 <button className={"quiz-nav-button"}
    //                         onClick={() => setCurrentQuestion(currentQuestion + 1)}>Next</button>
    //                 </div>
    //             ):(currentQuestion === quizLength-1) ? (
    //                 <div className={"quiz-navigation-button-container"}>
    //                     <button className={"quiz-nav-button"}
    //                             onClick={() => setCurrentQuestion(currentQuestion - 1)}>Previous</button>
    //                     <button className={"quiz-nav-button"} onClick={()=>saveFunction()}><SaveIcon color={"white"}/>Save</button>
    //                 <button className={"quiz-nav-button"} onClick={()=>endQuiz()}>Submit</button>
    //             </div>
    //             ):(
    //                 <div className={"quiz-navigation-button-container"}>
    //                     <button className={"quiz-nav-button"}
    //                             onClick={() => setCurrentQuestion(currentQuestion - 1)}>Previous</button>
    //                     <button className={"quiz-nav-button"}
    //                             onClick={()=>saveFunction()}><SaveIcon color={"white"}/>Save</button>
    //
    //                     <button className={"quiz-nav-button"}
    //                             onClick={() => setCurrentQuestion(currentQuestion + 1)}>Next</button>
    //
    //                 </div>
    //             )
    //
    //         }
    //
    //     </div>
    // )

    /**
     * Create a button for quiz navigation
     * @param clickHandler The function to call on click
     * @param text The text to show on the button
     * @returns {JSX.Element}
     */
    function createNavigationButton(text, clickHandler) {
        return <button className="quiz-nav-button" onClick={clickHandler}>{text}</button>;
    }

    let previousButton = null;
    let nextButton = null;
    let submitButton = null;
    let saveButton = createNavigationButton("Save", saveFunction);

    if (currentQuestion === 0) {
        let prevButtonText = quizLength > 1 ? "Frontpage" : "Previous";
        previousButton = createNavigationButton(prevButtonText, () => setCurrentQuestion(-1));
    }
    if (currentQuestion < quizLength - 1) {
        nextButton = createNavigationButton("Next", () => setCurrentQuestion(currentQuestion + 1));
    } else {
        submitButton = createNavigationButton("Submit", endQuiz);
    }

    return (
        <div className={"quiz-navigation"}>
            {previousButton}
            {saveButton}
            {nextButton}
            {submitButton}
        </div>
    )
}
