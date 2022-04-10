import React, {useEffect, useRef, useState} from 'react';
import './newquizmodulo.css';
import TextField from '@mui/material/TextField';
import DateTimePicker from '@mui/lab/DateTimePicker';
import AdapterDateFns from '@mui/lab/AdapterDateFns';
import LocalizationProvider from '@mui/lab/LocalizationProvider';
import {createTheme} from "@mui/material/styles";
import {ThemeProvider} from "@mui/system";
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Autocomplete from '@mui/material/Autocomplete';
import Switch from '@mui/material/Switch';
import {Button} from "@mui/material";
import ImageIcon from '@mui/icons-material/Image';
import {useNavigate} from "react-router";

export default function NewQuizModulo({setShowFunction}) {

    const ref = useRef(null);
    const navigate = useNavigate();
    const [deadlineDate, setDeadlineDate] = useState(new Date().setHours(23,59));
    const [enableDeadline, setEnableDeadline] = useState(true);
    const newQuizTheme = createTheme({
        typography: {
            fontSize: 25,
        },
        divider: {
            blue: "#000000",
        }
    });

    const handleClickOutside = (event) => {
        console.log(event.target.className);
        if (event.target.className === "new-quiz-modulo-wrapper") {
            setShowFunction(false);
        }
        //if (event.target.localName === "li" || event.target.className === "css-j7qwjs" || ref.current.contains(event.target)) {
        //    return;
        //}
        //setShowFunction(false);
    };

    useEffect(() => {
        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, []);

    return (
        <div className="new-quiz-modulo-wrapper">
            <ThemeProvider theme={newQuizTheme}>
            <div ref={ref} className="new-quiz-modulo">
                <h1>New Quiz - <span className="course-code">INFT2400</span> Applikasjonsutvikling</h1>
                <div className="editable-content-wrapper">
                        <div className="textfield-wrapper">
                            <TextField className="textfield" variant="outlined" label="Title"/>
                            <TextField multiline rows={9} className="textfield textarea" variant="outlined" label="Description"/>
                            <div className="deadline">
                            <LocalizationProvider dateAdapter={AdapterDateFns}>
                                <DateTimePicker
                                    ampm={false}
                                    disabled={!enableDeadline}
                                    className="deadline-picker"
                                    renderInput={(props) => <TextField {...props} />}
                                    label="Deadline"
                                    value={deadlineDate}
                                    onChange={(newValue) => {
                                        setDeadlineDate(newValue);
                                    }}
                                />
                            </LocalizationProvider>
                            <FormControlLabel className="no-deadline" onClick={()=>setEnableDeadline(!enableDeadline)} control={<Switch className="switch-thumb"/>} label="No deadline" />
                            </div>
                        </div>
                        <div className="extras-wrapper">
                            <Autocomplete
                                className="textfield"
                                options={["apple", "orange", "metamphetamine"]}
                                renderInput={(params) => <TextField {...params} label="Course" />}/>
                            <div className="quiz-cover-image">
                                <Button variant="contained" startIcon={<ImageIcon/>} component="label">Change<input type="file" hidden/></Button>
                            </div>
                            <Button sx={{fontSize: 18}} className="continue-button" variant="contained" onClick={()=>navigate("/quiz/new")}>Continue</Button>
                        </div>
                </div>
            </div>
            </ThemeProvider>
        </div>
    )
}