import React, {useEffect, useState} from 'react';
import './question.css';
import {Checkbox, FormControlLabel, FormGroup, RadioGroup, TextField} from "@mui/material";
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
 const [checkedAnswers,setCheckedAnswersArray] = useState([])
    let answer = {
        "answer": "",
        "questionId": question.questionId,
        "type": question.type,
        "status": "in-progress"
    }
    if (currAns !== undefined) {
        answer = currAns;

    }

    console.log("currAns",currAns)
    console.log(checkedAnswers)

    useEffect(() => {
        if (currAns !== undefined && question.type !== 2) {
            setCheckedAnswersArray(currAns.answer.split(",").map(id=>parseInt(id)))
            console.log(currAns)
        }
    }, [currAns])

    function setCheckedAnswers(newValue) {
        let tempCheckedAnswers = checkedAnswers;
        if (tempCheckedAnswers.includes(newValue)) {
            let newValueIndex = tempCheckedAnswers.indexOf(newValue);
            tempCheckedAnswers = tempCheckedAnswers.splice(newValueIndex, 1);
        } else {
            tempCheckedAnswers.push(newValue);
        }
        setCheckedAnswersArray(tempCheckedAnswers);

        let answerIdsString = "";
        tempCheckedAnswers.forEach(ansId => {
            answerIdsString = answerIdsString + ansId + ",";
        })
        answerIdsString = answerIdsString.slice(0, -1);
        answer.answer = answerIdsString;
        setAnswer(answer)
    }

    /**
     * Determines the correct content for the question depending on the question type.
     */
    function getCenterContent() {

        switch (question.type) {

            case 1:

                return <RadioGroup name={"question-" + question.questionId} key={"RadioGroup-"+question.questionId+checkedAnswers[0]} onChange={(elem) => {
                    answer.answer = elem.target.value;
                    setAnswer(answer)
                }} defaultValue={checkedAnswers[0]}>
                    {
                        question.alternatives.map((alternative) => {
                            alternative = JSON.parse(alternative);
                            return <FormControlLabel value={alternative.alternativeID}
                                                     control={<Radio size="large"/>}
                                                     label={alternative.alternative}/>;
                        })
                    }
                </RadioGroup>

            case 2:

                return <TextField
                    className={"longanswer-textfield"}
                    label={"Answer"}
                    key={"RadioGroup-"+question.questionId}
                    InputLabelProps={{style: {fontSize: 18}}}
                    InputProps={{style: {fontSize: 18}}}
                    multiline
                    rows={10}
                    defaultValue={answer.answer}
                    onChange={(elem) => {
                        answer.answer = elem.target.value;
                        setAnswer(answer)
                    }}>

                </TextField>

            case 3:
                return <FormGroup name={"question-" + question.questionId} key={"FormGroup-"+question.questionId+checkedAnswers[0]} onChange={(elem) => {
                    setCheckedAnswers(elem.target.value);
                }}>
                    {
                        question.alternatives.map((alternative) => {
                            alternative = JSON.parse(alternative);
                            return <FormControlLabel value={alternative.alternativeID}
                                                     defaultChecked={checkedAnswers ? checkedAnswers.includes(alternative.alternativeID) : false}
                                                     control={<Checkbox defaultChecked={checkedAnswers ? checkedAnswers.includes(alternative.alternativeID):false} sx={{'& .MuiSvgIcon-root': {fontSize: 30}}}/>}
                                                     label={alternative.alternative}/>;
                        })
                    }
                </FormGroup>
        }
    }

    return (
        <div className={"question-wrapper"} key={currentQuestion}>
            <div className="question-header-wrapper">
                <h1>{question.questionText}</h1>
                {question.type === 3 ? <span className="multiple-correct-answers">NOTE: This question has multiple correct answers. Wrong answers give negative credit.</span> : null}
            </div>
            {
                getCenterContent()
            }
        </div>)
}