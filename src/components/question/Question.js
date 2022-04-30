import React from 'react';
import './question.css';
import {FormControlLabel, RadioGroup} from "@mui/material";
import Radio from "@mui/material/Radio";

export default function Question({question, currentQuestion, setAnswer, currAns}) {
    let answer = {
        "answer": "",
        "questionID": question.questionID,
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
                        <RadioGroup name={"question-" + question.id} onChange={(elem) => {
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