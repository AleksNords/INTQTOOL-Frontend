import React, {useState} from 'react';
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
    const [checkedAnswers, setCheckedAnswersArray] = useState([]);
    let answer = {
        "answer": "",
        "questionId": question.questionId,
        "type": question.type,
        "status": "in-progress"
    }
    if (currAns !== undefined) {
        answer = currAns;
    }

    function setCheckedAnswers(newValue) {
        let tempCheckedAnswers = checkedAnswers;
        if (tempCheckedAnswers.includes(newValue)) {
            let newValueIndex = tempCheckedAnswers.indexOf(newValue);
            tempCheckedAnswers.splice(newValueIndex, 1);
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

                return <RadioGroup name={"question-" + question.questionId} onChange={(elem) => {
                    answer.answer = elem.target.value;
                    setAnswer(answer)
                }} defaultValue={answer.answer}>
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
                    InputLabelProps={{style: {fontSize: 18}}}
                    InputProps={{style: {fontSize: 18}}}
                    multiline
                    rows={10}
                    onChange={(elem) => {
                        answer.answer = elem.target.value;
                        setAnswer(answer)
                    }}>
                    {(currAns !== undefined) ? currAns.answer : null}
                </TextField>

            case 3:
                return <FormGroup name={"question-" + question.questionId} onChange={(elem) => {
                    setCheckedAnswers(elem.target.value);
                }} defaultValue={answer.answer}>
                    {
                        question.alternatives.map((alternative) => {
                            alternative = JSON.parse(alternative);
                            return <FormControlLabel value={alternative.alternativeID}
                                                     control={<Checkbox size="large"/>}
                                                     label={alternative.alternative}/>;
                        })
                    }
                </FormGroup>
        }
    }

    return (
        <div className={"question-wrapper"} key={currentQuestion}>
            <h1 className={"question-text-header"}>{question.questionText}</h1>
            {
                getCenterContent()
            }
        </div>)
}