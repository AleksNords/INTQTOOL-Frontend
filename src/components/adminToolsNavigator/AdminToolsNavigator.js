import React from 'react';
import './adminToolsNavigator.css';

/**
 * The navigation component used in the admin tool page. Lets the user swap between user and course tools
 * @param setCurrentTool function to set the current tool view in admin tool page
 * @returns Navigation element to swap the view between user and course tools
 */
export default function AdminToolsNavigator({setCurrentTool}){

    /**
     * Toggles the classnames of the two elements to communicate which one is active to the user
     * @param elem The clicked element
     */
    function toggleActiveArchiveQuiz(elem){
        let activeQuizElem = document.getElementById("user-tools-headers");
        let archivedQuizElem = document.getElementById("course-tools-headers");
        if(elem.target.id === "user-tools-headers"){
            activeQuizElem.className = "quiz-type-navigator-title quiz-type-navigator-title-enabled"
            archivedQuizElem.className = "quiz-type-navigator-title quiz-type-navigator-title-disabled"
            setCurrentTool(1);

        }else if(elem.target.id === "course-tools-headers"){
            activeQuizElem.className = "quiz-type-navigator-title quiz-type-navigator-title-disabled"
            archivedQuizElem.className = "quiz-type-navigator-title quiz-type-navigator-title-enabled"
            setCurrentTool(2);
        }

    }

    return(<div className={"admin-tools-navigator-wrapper"}>
        <div className={"admin-tools-navigator"}>
            <h1 id="user-tools-headers" onClick={(elem)=>toggleActiveArchiveQuiz(elem)} className={"quiz-type-navigator-title quiz-type-navigator-title-enabled"}>User tools</h1>
            <h1 id="course-tools-headers" onClick={(elem)=>toggleActiveArchiveQuiz(elem)} className={"quiz-type-navigator-title quiz-type-navigator-title-disabled"}>Course tools</h1>

        </div>
    </div>)
}