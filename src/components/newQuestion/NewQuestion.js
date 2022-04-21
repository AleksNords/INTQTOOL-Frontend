import React, {useEffect, useState} from "react";
import './newquestion.css';
import TextField from "@mui/material/TextField";
import {Button, FormControlLabel, Radio, RadioGroup} from "@mui/material";
import MultipleChoiceModule from "../multipleChoiceModule/MultipleChoiceModule";
import HintModule from "../hintModule/HintModule";
import CloseIcon from '@mui/icons-material/Close';
import SettingsIcon from '@mui/icons-material/Settings';
import ArrowRightIcon from '@mui/icons-material/ArrowRight';
import sx from "@mui/system/sx";
import {width} from "@mui/system";

export default function NewQuestion({
                                        question,
                                        deleteQuestion,
                                        questionNumber,
                                        setQuestion,
                                        changeQuestionText,
                                        questionIndex,
                                        changeQuestionAlternatives,
                                        changeQuestionHints,
                                        setIsMultipleChoice,
                                        submitQuiz
                                    }) {

    const [alternativeAmnt, setAlternativeAmnt] = useState(4);
    const [hintAmnt, setHintAmnt] = useState(0);

    if (question && question.alternatives.length === 0) {
        for (let i = 0; i < 4; i++) {
            let temp = question;
            temp.alternatives.push({
                alternativeText: "",
                correct: false
            })
            setQuestion(temp);
        }
    }

    console.log(question);
    const [isMultipleChoice, setMyIsMultipleChoice] = useState((question.type === 1));

    function addAlternative() {
        if (question.alternatives.length < 6) {
            let temp = question;
            temp.alternatives.push({
                alternativeText: "",
                correct: false,
            });
            setQuestion(temp);
            setAlternativeAmnt(alternativeAmnt + 1);
            changeQuestionAlternatives(questionIndex, temp.alternatives);
        }
    }

    function deleteAlternative(index) {
        let temp = question;
        temp.alternatives.splice(index, 1);
        setQuestion(temp);
        setAlternativeAmnt(alternativeAmnt - 1);
        changeQuestionAlternatives(questionIndex, temp.alternatives);
    }

    function changeAlternative(alternative) {
        let temp = question;
        let index = question.alternatives.indexOf(alternative);
        temp.alternatives[index] = alternative;
        setQuestion(temp);
        changeQuestionAlternatives(questionIndex, temp.alternatives);
    }

    function addHint() {
        if (question.hints.length < 5) {
            let temp = question;
            temp.hints.push("");
            setQuestion(temp);
            setHintAmnt(hintAmnt + 1);
            changeQuestionHints(questionIndex, temp.hints);
        }
    }

    function deleteHint(index) {
        let temp = question;
        temp.hints.splice(index, 1);
        setQuestion(temp);
        setHintAmnt(hintAmnt - 1);
        changeQuestionHints(questionIndex, temp.hints);
    }


    function changeHint(hint, index) {
        let temp = question;
        temp.hints[index] = hint;
        setQuestion(temp);
        changeQuestionHints(questionIndex, temp.hints);
    }

    function setMultipleChoice(index, newValue) {
        setMyIsMultipleChoice(newValue);
        setIsMultipleChoice(index, newValue);
    }

    return (
        <div key={"question" + questionIndex + question.questionText} className="new-question">
            <div className="top-content-wrapper">
                <h1 className="question-number">
                    {questionNumber}
                </h1>
                <Button onClick={() => deleteQuestion(questionIndex)} endIcon={<CloseIcon/>} variant="contained"
                        sx={{fontSize: 16, backgroundColor: "#f63e3e", ":hover": {backgroundColor: "#cf3535"}}}
                        className="remove-question-button">remove</Button>
            </div>
            <div className="main-question-content-wrapper">
                <div className="main-question-content">
                    <TextField key={question.question + questionIndex} defaultValue={question.questionText}
                               onChange={(elem) => changeQuestionText(questionIndex, elem.target.value)} multiline
                               rows={5} InputProps={{style: {fontSize: 20}}} className="question-textfield"
                               variant="outlined" label="Question"/>
                    <RadioGroup key={"multipleChoice" + questionNumber}
                                defaultValue={question.type}>
                        <FormControlLabel value="2"
                                          control={<Radio onClick={() => setMultipleChoice(questionIndex, false)}
                                                          className="question-type-radio" size={"large"}/>}
                                          label="Freetext answer"/>
                        <FormControlLabel value="1"
                                          control={<Radio onClick={() => setMultipleChoice(questionIndex, true)}
                                                          className="question-type-radio" size={"large"}/>}
                                          label="Multiple choice"/>
                        {question.type === 1 ?
                            <MultipleChoiceModule key={questionNumber} changeAlternative={changeAlternative}
                                                  addAlternative={addAlternative} deleteAlternative={deleteAlternative}
                                                  alternatives={question.alternatives}/> : null}
                    </RadioGroup>
                </div>
                <HintModule changeHint={changeHint} addHint={addHint} deleteHint={deleteHint} hints={question.hints}/>
            </div>
        </div>

    )
}