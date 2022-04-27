import React from "react";
import './hintmodule.css';
import TextField from "@mui/material/TextField";
import AddIcon from '@mui/icons-material/Add';
import CloseIcon from '@mui/icons-material/Close';
import IconButton from "@mui/material/IconButton";
import Button from "@mui/material/Button";
import LightbulbOutlinedIcon from '@mui/icons-material/LightbulbOutlined';

export default function HintModule({addHint, hints, deleteHint, changeHint}) {

    const hintDivs = [];

    for (let i = 0; i < hints.length; i++) {
        // TODO - too long line(s)
        hintDivs.push(
            <div key={JSON.stringify(hints[i]) + i} className="hint-wrapper"><LightbulbOutlinedIcon sx={{fontSize: 40}} className="hint-icon"/><TextField key={hints[i] + i} defaultValue={hints[i]} onChange={(elem)=>{let temp = elem.target.value; changeHint(temp, i)}}  className="hint-textfield" variant="outlined"/><IconButton ><CloseIcon onClick={()=>deleteHint(i)} sx={{fontSize: 30, color: "#000000"}}/></IconButton></div>
        );
    }

    return (
        <div className="hint-module">
            {/*TODO - why do you need to map hintDivs to themselves here? why not simply {hintDivs}? */}
            {hintDivs.map((divs)=> divs)}
            {   hints.length < 5 ?
                <div className="hint-wrapper"><LightbulbOutlinedIcon sx={{fontSize: 40, color: "#646464"}} className="hint-icon"/><Button onClick={()=>addHint()} sx={{borderColor: "#646464", borderStyle: "dashed", borderWidth: 2, textTransform: "none", ":hover": {borderColor: "#646464", borderWidth: 2}}} className="add-new-hint-button" variant="outlined"><AddIcon sx={{fontSize: 30, color: "#646464"}}/> Add a hint</Button></div>
                : null
            }
        </div>
    )
}
