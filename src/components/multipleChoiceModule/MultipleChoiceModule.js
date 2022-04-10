import React from "react";
import './multiplechoicemodule.css';
import {Checkbox, FormControlLabel} from "@mui/material";
import TextField from "@mui/material/TextField";
import AddIcon from '@mui/icons-material/Add';
import CloseIcon from '@mui/icons-material/Close';
import IconButton from "@mui/material/IconButton";
import Button from "@mui/material/Button";
import {createTheme} from "@mui/material/styles";
import {ThemeProvider} from "@mui/system";

export default function MultipleChoiceModule({addAlternative, alternatives, deleteAlternative, changeAlternative}) {

    const alternativeLetters = ["A","B","C","D","E","F"];
    const alternativeDivs = [];

    for (let i = 0; i < alternatives.length; i++) {
        alternativeDivs.push(
            <div className="choice-wrapper"><FormControlLabel value={alternativeLetters[i]} control={<Checkbox key={JSON.stringify(alternatives[i]) + i} defaultChecked={alternatives[i].correct} onChange={(elem)=>{let temp = alternatives[i]; temp.correct = elem.target.checked; changeAlternative(temp)}} sx={{color: "#F63E3E", width: 45, '&.Mui-checked': {color: "#42C767",},}} icon={<span className="question-choice" >{alternativeLetters[i]}</span>} checkedIcon={<span className="question-choice" >{alternativeLetters[i]}</span>}/>} label={<TextField key={alternatives[i].alternativeText} defaultValue={alternatives[i].alternativeText} onChange={(elem)=>{let temp = alternatives[i]; temp.alternativeText = elem.target.value; changeAlternative(temp)}} className="question-choice-textfield" variant="outlined"/>}/><IconButton onClick={()=>deleteAlternative(i)}><CloseIcon sx={{fontSize: 30, color: "#000000"}}/></IconButton></div>
        );
    }

    const dashTheme = createTheme({
        border: {
            borderStyle: "dashed",
        },
    });

    return (
        <div className="multiple-choice-module">
            {alternativeDivs.map((divs)=> divs)}
            {   alternatives.length < 6 ?
                <div className="choice-wrapper"><ThemeProvider theme={dashTheme}><Button onClick={()=>addAlternative()} sx={{borderColor: "#646464", borderStyle: "dashed", borderWidth: 2, ":hover": {borderColor: "#646464", borderWidth: 2}}} className="add-new-choice-button" variant="outlined"><AddIcon sx={{fontSize: 30, color: "#646464"}}/></Button></ThemeProvider></div>
                : null
            }
        </div>
    )
}