import React from 'react';
import './adminToolsNavigator.css';
import {Button} from "@mui/material";
import AddIcon from "@mui/icons-material/Add";

export default function AdminToolsNavigator({setCurrentTool}){

    function toggleActiveArchiveQuiz(elem){
        let activeQuizElem = document.getElementById("user-tools-headers");
        let archivedQuizElem = document.getElementById("course-tools-headers");
        if(elem.target.id === "user-tools-headers"){
            activeQuizElem.className = "quiz-type-navigator-title quiz-type-navigator-title-enabled"
            archivedQuizElem.className = "quiz-type-navigator-title quiz-type-navigator-title-disabled"
            // TODO - magic constants again :)
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
