import React, {useEffect, useState} from 'react';
import './gradingquestion.css';
import {Button, FormControlLabel, Radio, RadioGroup, TextField} from "@mui/material";
import CheckIcon from "@mui/icons-material/Check";
import CloseIcon from "@mui/icons-material/Close";
import PercentIcon from "@mui/icons-material/Percent";
import SendIcon from '@mui/icons-material/Send';

/**
 * Element used to display an interface that lets you grade a single question
 * @param question question object
 * @param questionIndex index of the question in the quiz
 * @param currentAnswer answer currently being graded
 * @param gradeFunction function used to grade the current answer
 * @returns {JSX.Element}
 * @constructor
 */
export default function GradingQuestion({question, questionIndex, answers}) {


    //When a new answer is selected, we display the feedback it has received, if it hasn't received any we reset the feedback field
    return (
        <div className="grading-question">
            <h2 className="question-text">Question {questionIndex}: {question ? question.questionText : null} </h2>
            <h2 className="grading-feedback-list">Your previous feedback</h2>
            <div className={"grading-quiz-feedback-list"}>
                {
                    answers && question.type && question.type !== 1 && question.type !== 3 ? answers.map((ans) => {
                            if (!(!ans.feedback || /^\s*$/.test(ans.feedback))) {
                                return <div className={"feedback-list-item-wrapper"}><p
                                    className={"feedback-list-text-item"}>{ans.feedback}</p></div>
                            }

                        })
                        :
                        null
                }
            </div>
        </div>
    )
}