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
import {useSelector} from "react-redux";

export default function NewQuizModulo({setShowFunction, setShowSavedQuiz}) {

    const ref = useRef(null);
    const navigate = useNavigate();
    const isLogged = useSelector(state => state.isLoggedReducer);
    const [deadlineDate, setDeadlineDate] = useState(new Date().setHours(23,59));
    const [enableDeadline, setEnableDeadline] = useState(true);
    const [title,setTitle] = useState("");
    const [courseID, setCourseID] = useState("");
    const [description, setDescription] = useState("");
    const [courseOptions, setCourseOptions] = useState([]);


    const url = "https://quiz.web-tek.ninja:8443";
    const newQuizTheme = createTheme({
        typography: {
            fontSize: 25,
        },
        divider: {
            blue: "#000000",
        }
    });

    useEffect(() => {
        axios({
            method: "get",
            url: url+"/user/courses",
            headers: {
                "Authorization": "Bearer " + isLogged.jwtToken
            }
        }).then(function (response) {
            setCourseOptions(response.data.map((crs) => {
                let temp = JSON.parse(crs);
                return ({
                    label: temp.name,
                    id: temp.id
                })
            }));
        })
    }, []);

    function submitQuizDetails() {
        let newQuizId;

        axios({
            method: 'post',
            url: url + "/quiz/new/" + courseID,
            headers: {
                "Authorization": "Bearer " + isLogged.jwtToken
            },
            data: {
                deployedQuiz: {
                    title: title,
                    description: description
                },
                deadline: deadlineDate
            }
        }).then((response) => {
            if (response.status === 200) {
                navigate("/quizeditor/"+response.data.deployedQuizId)
            } else {

            }

        })
        //navigate("/quizeditor/"+newQuizId);

    }

    const handleClickOutside = (event) => {
        if (event.target.className === "new-quiz-modulo-wrapper") {
            if (typeof setShowSavedQuiz === "function") {
                setShowSavedQuiz(true);
            }
            setShowFunction(false);
        }
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
                <h1>New Quiz</h1>
                <div className="editable-content-wrapper">
                        <div className="textfield-wrapper">
                            <TextField className="new-quiz-textfield" variant="outlined" label="Title" onChange={(elem)=>setTitle(elem.target.value)}/>
                            <TextField multiline inputProps={{
                                style: {
                                    height: "21.5vh",
                                },
                            }} className="new-quiz-textfield textarea" variant="outlined" label="Description" onChange={(elem)=>setDescription(elem.target.value)}/>
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
                                className="new-quiz-textfield"
                                options={courseOptions}
                                value={courseOptions.id}
                                onChange={(elem, newValue) => {
                                    if (newValue) {
                                        setCourseID(newValue.id);
                                    }
                                    else {
                                        setCourseID("");
                                    }
                                    }}
                                renderInput={(params) => <TextField {...params} label="Course"/>}/>
                            <div className="quiz-cover-image">
                                <Button variant="contained" startIcon={<ImageIcon/>} component="label">Change<input type="file" hidden/></Button>
                            </div>
                            <Button sx={{fontSize: 17}} className="continue-button" variant="contained" onClick={()=>submitQuizDetails()}>Continue</Button>
                        </div>
                </div>
            </div>
            </ThemeProvider>
        </div>
    )
}