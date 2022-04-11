import React, {useEffect, useState} from "react";
import './newquestion.css';
import TextField from "@mui/material/TextField";
import {Button, FormControlLabel, Radio, RadioGroup} from "@mui/material";
import MultipleChoiceModule from "../multipleChoiceModule/MultipleChoiceModule";
import HintModule from "../hintModule/HintModule";
import CloseIcon from '@mui/icons-material/Close';


export default function NewQuestion({question, deleteQuestion, questionNumber, setQuestion, changeQuestionText, questionIndex, changeQuestionAlternatives, setIsMultipleChoice, submitQuiz}) {

    const [alternativeAmnt, setAlternativeAmnt] = useState(4);
    const [hintAmnt, setHintAmnt] = useState(0);

    if (question && question.alternatives.length == 0) {
        for (let i = 0; i < 4; i++) {
            let temp = question;
            temp.alternatives.push({
                     alternativeText: "",
                     correct: false
                 })
            setQuestion(temp);
        }
    }


    const [isMultipleChoice, setMyIsMultipleChoice] = useState(question.isMultipleChoice);
    const [hints, setHints] = useState([]);

    function addAlternative() {
        if (alternatives.length < 6) {
            let temp = alternatives;
            temp.push({
                alternativeText: "",
                correct: false,
            });
            setAlternatives(temp);
            setAlternativeAmnt(alternativeAmnt + 1);
            changeQuestionAlternatives(questionIndex, temp.alternatives);
        }
    }

    function deleteAlternative(index) {
        let temp = alternatives;
        temp.splice(index, 1);
        setAlternatives(temp);
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
        if (hints.length < 5) {
            let temp = hints;
            temp.push("");
            setHints(temp);
            setHintAmnt(hintAmnt + 1);
        }
    }

    function deleteHint(index) {
        let temp = hints;
        temp.splice(index, 1);
        setHints(temp);
        setHintAmnt(hintAmnt - 1);
        console.log(hints);
    }

    function changeHint(hint, index) {
        let temp = hints;
        temp[index] = hint;
        setHints(temp);
        console.log(hints);
    }

    function setMultipleChoice(index, newValue) {
        setMyIsMultipleChoice(newValue);
        setIsMultipleChoice(index, newValue);
    }

    return(
        <div key={"question" + questionIndex + question.questionText} className="new-question">
            <div className="top-content-wrapper">
                <h1 className="question-number">
                    {questionNumber}
                </h1>
                <Button onClick={()=> deleteQuestion(questionIndex)} endIcon={<CloseIcon/>} variant="contained" sx={{fontSize: 16, backgroundColor: "#f63e3e", ":hover": {backgroundColor: "#cf3535"}}} className="remove-question-button" >remove</Button>
            </div>
            <div className="main-question-content-wrapper">
                <div className="main-question-content">
                    <TextField key={question.questionText + questionIndex} defaultValue={question.questionText} onChange={(elem)=> changeQuestionText(questionIndex, elem.target.value)} multiline rows={5} inputProps={{style: {fontSize: 20}}} className="question-textfield" variant="outlined" label="Question"/>
                    <RadioGroup key={"multipleChoice" + questionNumber} defaultValue={question.isMultipleChoice ? "multiple_choice" : "long_answer"}>
                        <FormControlLabel value="long_answer" control={<Radio onClick={()=>setMultipleChoice(questionIndex, false)} className="question-type-radio" size={"large"}/>} label="Freetext answer" />
                        <FormControlLabel value="multiple_choice" control={<Radio onClick={()=>setMultipleChoice(questionIndex, true)} className="question-type-radio" size={"large"}/>} label="Multiple choice" />
                        {question.isMultipleChoice ? <MultipleChoiceModule key={questionNumber} changeAlternative={changeAlternative} addAlternative={addAlternative} deleteAlternative={deleteAlternative} alternatives={question.alternatives}/> : null}
                    </RadioGroup>
                </div>
                <HintModule changeHint={changeHint} addHint={addHint} deleteHint={deleteHint} hints={hints}/>
            </div>
            <div className="new-quiz-submit-button-wrapper">
                <Button onClick={()=> submitQuiz()} variant="contained" sx={{fontSize: 16, backgroundColor: "#42C767", ":hover": {backgroundColor: "#42c767"}}} className="remove-question-button" >submit</Button>
            </div>
        </div>

    )
}