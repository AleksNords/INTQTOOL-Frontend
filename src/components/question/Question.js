import React, {useState} from 'react';
import './question.css';
import {FormControlLabel, RadioGroup, useRadioGroup} from "@mui/material";
import Radio from "@mui/material/Radio";

export default function Question({question, currentQuestion,setAnswer,currAns}) {


    return (
        <div className={"question-wrapper"} key={currentQuestion}>
            <h1 className={"question-text-header"}>{question.question}</h1>
            {
                (question.type === "multiple_choice" && question.alternatives !== undefined) ? (
                        <RadioGroup name={"question-"+question.id} onChange={(elem)=>setAnswer({
                            "question":question.question,
                            "answer":elem.target.value,
                            "questionId":question.id,
                            "type":question.type
                        })} defaultValue={(currAns !== undefined) ? currAns.answer : null}>

                                {
                                    question.alternatives.map((alternative) => {
                                        alternative = JSON.parse(alternative);
                                        return <FormControlLabel value={alternative.alternative}
                                                                 control={<Radio />}
                                                                 label={alternative.alternative} />;


                                    })
                                }

                        </RadioGroup>
                    )
                    :
                    (question.type === "long_answer") ? (
                            <textarea
                                className={"longanswer-textfield"}
                                placeholder={"Ditt svar her..."} onChange={(elem)=>setAnswer({
                                "question":question.question,
                                "answer":elem.target.value,
                                "questionId":question.id,
                                "type":question.type
                            })} value={(currAns !== undefined) ? currAns.answer : null}>

                            </textarea>
                        )
                        : null
            }
        </div>)
}