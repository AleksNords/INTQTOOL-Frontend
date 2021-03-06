import React from "react";
import './multiplechoicemodule.css';
import {Checkbox, FormControlLabel} from "@mui/material";
import TextField from "@mui/material/TextField";
import AddIcon from '@mui/icons-material/Add';
import CloseIcon from '@mui/icons-material/Close';
import IconButton from "@mui/material/IconButton";
import Button from "@mui/material/Button";

/**
 * Module used to enter choices for a multiple choice question. Contains alternatives and their correctness
 * @param addAlternative function used to add an alternative to the question
 * @param alternatives the already existing alternatives
 * @param deleteAlternative function used to delete an alternative from the question
 * @param changeAlternative function used to change an alternative in the question
 * @returns module used to edit, add and delete alternatives in a multiple choice question
 */
export default function MultipleChoiceModule({addAlternative, alternatives, deleteAlternative, changeAlternative}) {

    const alternativeLetters = ["A", "B", "C", "D", "E", "F"];
    const alternativeDivs = [];

    //Creates all the elements representing the alternatives and adds them to the alternativeDivs array
    for (let i = 0; i < alternatives.length; i++) {
        alternativeDivs.push(
            <div key={JSON.stringify(alternatives[i]) + i}>
                <FormControlLabel value={alternativeLetters[i]} control={
                    <Checkbox tabIndex={-1} key={JSON.stringify(alternatives[i]) + i}
                              defaultChecked={alternatives[i].rightAlternative}
                              onChange={(elem) => {
                                  let temp = alternatives[i];
                                  temp.rightAlternative = elem.target.checked;
                                  changeAlternative(temp)
                              }}
                              sx={{color: "#F63E3E", width: 45, '&.Mui-checked': {color: "#42C767",},}}
                              icon={<span className="question-choice">{alternativeLetters[i]}</span>}
                              checkedIcon={<span className="question-choice">{alternativeLetters[i]}</span>}/>}
                                  label={<TextField key={alternatives[i].alternative}
                                                    defaultValue={alternatives[i].alternative}
                                                    onChange={(elem) => {
                                                        let temp = alternatives[i];
                                                        temp.alternative = elem.target.value;
                                                        changeAlternative(temp)
                                                    }}
                                                    className="question-choice-textfield" variant="outlined"/>}/>
                <IconButton tabIndex={-1} onClick={() => deleteAlternative(i)}>
                    <CloseIcon sx={{fontSize: 30, color: "#000000"}}/>
                </IconButton>
            </div>
        );
    }

    return (
        <div className="multiple-choice-module">
            {alternativeDivs.map((divs) => divs)}
            {alternatives.length < 6 ?
                <Button onClick={() => addAlternative()} sx={{
                    borderColor: "#646464",
                    borderStyle: "dashed",
                    borderWidth: 2,
                    ":hover": {borderColor: "#646464", borderWidth: 2}
                }} className="add-new-choice-button" variant="outlined"><AddIcon sx={{fontSize: 30, color: "#646464"}}/></Button>
                : null
            }
        </div>
    )
}