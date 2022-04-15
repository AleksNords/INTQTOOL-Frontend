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
import axios from 'axios';

export default function NewQuizModulo({setShowFunction}) {

    const ref = useRef(null);
    const navigate = useNavigate();
    const [deadlineDate, setDeadlineDate] = useState(new Date().setHours(23,59));
    const [enableDeadline, setEnableDeadline] = useState(true);
    const [title,setTitle] = useState("");
    const [course,setCourse] = useState("");
    const [description, setDescription] = useState("");
    const url = "https://quiz.web-tek.ninja:8443";
    const newQuizTheme = createTheme({
        typography: {
            fontSize: 25,
        },
        divider: {
            blue: "#000000",
        }
    });

    function submitQuizDetails(){
        let newQuizId;
        // axios({
        //         method: 'post',
        //         url: url+"/newquiz",
        //         data: {
        //             title:title,
        //             course:course,
        //             description:description,
        //             deadlineDate:deadlineDate
        //         }
        // }).then((response)=>{
        //     if(response.status === 200){
        //         newQuizId =response.data;
        //         navigate("/quizeditor/"+newQuizId)
        //     }else{
        //
        //     }
        //
        // })
        navigate("/quizeditor/"+1);
    }

    const handleClickOutside = (event) => {
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
                            <TextField className="textfield" variant="outlined" label="Title" onChange={(elem)=>setTitle(elem.target.value)}/>
                            <TextField multiline rows={9} className="textfield textarea" variant="outlined" label="Description" onChange={(elem)=>setDescription(elem.target.value)}/>
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
                                renderInput={(params) => <TextField {...params} label="Course" onChange={(elem)=>setCourse(elem.target.value)}/>}/>
                            <div className="quiz-cover-image">
                                <Button variant="contained" startIcon={<ImageIcon/>} component="label">Change<input type="file" hidden/></Button>
                            </div>
                            <Button sx={{fontSize: 18}} className="continue-button" variant="contained" onClick={()=>submitQuizDetails()}>Continue</Button>
                        </div>
                </div>
            </div>
            </ThemeProvider>
        </div>
    )
}