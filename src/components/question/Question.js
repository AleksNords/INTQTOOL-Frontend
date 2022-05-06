import React from 'react';
import './question.css';
import {FormControlLabel, RadioGroup} from "@mui/material";
import Radio from "@mui/material/Radio";

/**
 * A single question in a quiz being taken by a student
 * @param question object representing the question
 * @param currentQuestion index of the current question
 * @param setAnswer function used to set the student answer
 * @param currAns the answer provided by the student
 * @returns element representing a single question in a quiz
 */
export default function Question({question, currentQuestion, setAnswer, currAns}) {
    let answer = {
        "answer": "",
        "questionId": question.questionId,
        "type": question.type,
        "status": "in-progress"
    }
    if (currAns !== undefined) {
        answer = currAns;
    }


    return (
        <div className={"question-wrapper"} key={currentQuestion}>
            <h1 className={"question-text-header"}>{question.questionText}</h1>
            {
                (question.type === 1 && question.alternatives !== undefined) ? (
                        <RadioGroup name={"question-" + question.questionId} onChange={(elem) => {
                            answer.answer = elem.target.value;
                            setAnswer(answer)
                        }} defaultValue={answer.answer}>
                            {
                                question.alternatives.map((alternative) => {
                                    alternative = JSON.parse(alternative);
                                    return <FormControlLabel value={alternative.alternative}
                                                             control={<Radio/>}
                                                             label={alternative.alternative}/>;
                                })
                            }
                        </RadioGroup>
                    )
                    :
                    (question.type === 2) ? (
                            <textarea
                                className={"longanswer-textfield"}
                                placeholder={"Ditt svar her..."} onChange={(elem) => {
                                answer.answer = elem.target.value;
                                setAnswer(answer)
                            }}>
                                {(currAns !== undefined) ? currAns.answer : null}
                            </textarea>
                        )
                        : null
            }
        </div>)
}