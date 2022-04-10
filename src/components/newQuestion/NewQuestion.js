import React, {useState} from "react";
import './newquestion.css';
import TextField from "@mui/material/TextField";
import {FormControlLabel, Radio, RadioGroup} from "@mui/material";
import MultipleChoiceModule from "../multipleChoiceModule/MultipleChoiceModule";

export default function NewQuestion({questionNumber, setQuestion}) {


    const initialAlternatives = [];
    const [alternativeAmnt,setAlternativeAmnt] = useState(4);

    for (let i = 0; i < 4; i++) {
        initialAlternatives.push({
            alternativeText: "",
            correct: false,
        })
    }

    const [showMultipleChoiceModule, setShowMultipleChoiceModule] = useState(false);
    const [alternatives, setAlternatives] = useState(initialAlternatives);

    function addAlternative() {
        if (alternatives.length < 6) {
            let temp = alternatives;
            temp.push({
                alternativeText: "",
                correct: false,
            });
            setAlternatives(temp);
            setAlternativeAmnt(alternativeAmnt + 1);
        }
    }

    function deleteAlternative(index) {
        let temp = alternatives;
        temp.splice(index, 1);
        setAlternatives(temp);
        setAlternativeAmnt(alternativeAmnt - 1);
    }

    function changeAlternative(alternative) {
        let temp = alternatives;
        let index = alternatives.indexOf(alternative);
        temp[index] = alternative;
        setAlternatives(temp);
    }

    return(
        <div className="new-question">
            <h1 className="question-number">
                {questionNumber}
            </h1>
            <div className="main-question-content-wrapper">
                <div className="main-question-content">
                    <TextField multiline rows={5} inputProps={{style: {fontSize: 20}}} className="question-textfield" variant="outlined" label="Question"/>
                    <RadioGroup>
                        <FormControlLabel value="long_answer" control={<Radio onClick={()=>setShowMultipleChoiceModule(false)} className="question-type-radio" size={"large"}/>} label="Freetext answer" />
                        <FormControlLabel value="multiple_choice" control={<Radio onClick={()=>setShowMultipleChoiceModule(true)} className="question-type-radio" size={"large"}/>} label="Multiple choice" />
                        {showMultipleChoiceModule ? <MultipleChoiceModule changeAlternative={changeAlternative} addAlternative={addAlternative} deleteAlternative={deleteAlternative} alternatives={alternatives}/> : null}
                    </RadioGroup>
                </div>
            </div>
        </div>

    )
}