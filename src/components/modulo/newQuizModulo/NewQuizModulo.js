import React, {useEffect, useRef, useState} from 'react';
import './newquizmodulo.css';
import TextField from '@mui/material/TextField';
import DateTimePicker from '@mui/lab/DateTimePicker';
import AdapterDateFns from '@mui/lab/AdapterDateFns';
import LocalizationProvider from '@mui/lab/LocalizationProvider';
import FormControlLabel from '@mui/material/FormControlLabel';
import Autocomplete from '@mui/material/Autocomplete';
import Switch from '@mui/material/Switch';
import {Button} from "@mui/material";
import ImageIcon from '@mui/icons-material/Image';
import {useNavigate} from "react-router";
import axios from 'axios';
import {useSelector} from "react-redux";

/**
 * A modulo used to create a new quiz or edit the one currently being created
 * @param setShowFunction function used to set whether the modulo should show or not
 * @param setShowSavedQuiz function used to show an alert notifying the user that the quiz has been saved
 * @param quizDetails the quiz details. Includes deadline, title, description and course
 * @returns modulo that can be used to create or edit a quiz
 */
export default function NewQuizModulo({setShowFunction, setShowSavedQuiz, quizDetails}) {

    const ref = useRef(null);
    const navigate = useNavigate();
    const isLogged = useSelector(state => state.isLoggedReducer);
    const [deadlineDate, setDeadlineDate] = useState(quizDetails ? quizDetails.deadline : new Date().setHours(23,59));
    const [enableDeadline, setEnableDeadline] = useState(true);
    const [title, setTitle] = useState(quizDetails ? quizDetails.deployedQuiz.title : "");
    const [courseID, setCourseID] = useState(quizDetails ? quizDetails.courseId : "");
    const [description, setDescription] = useState(quizDetails ? quizDetails.deployedQuiz.description : "");
    const [courseOptions, setCourseOptions] = useState([]);

    useEffect(() => {
        axios({
            method: "get",
            url: process.env.REACT_APP_URL + "/user/courses",
            headers: {
                "Authorization": "Bearer " + isLogged.jwtToken
            }
        }).then(function (response) {
            setCourseOptions(response.data.map((crs) => {
                return JSON.parse(crs);
            }));
        })
    }, []);

    /**
     * Saves the quiz details from the modulo and creates a new quiz
     */
    function submitQuizDetails() {
        let updatedQuizDetails;
        if(quizDetails){
            let temp = quizDetails;
            temp.courseId = courseID;
            temp.deployedQuiz.title = title;
            temp.deployedQuiz.description = description;
            temp.deadline = deadlineDate;
            delete temp.deployedQuiz.author;
            delete temp.deployedQuiz.questions;
            updatedQuizDetails = temp;
        }else{
            updatedQuizDetails = {
                deployedQuiz: {
                    title: title,
                    description: description
                },
                deadline: deadlineDate
            }
        }

        axios({
            method: 'post',
            url: process.env.REACT_APP_URL + "/quiz/new/" + courseID,
            headers: {
                "Authorization": "Bearer " + isLogged.jwtToken
            },
            data: updatedQuizDetails
        }).then((response) => {
            if (response.status === 200) {
                navigate("/quizeditor/"+response.data)
            }
        })
    }

    /**
     * Function used to close the modulo if a click outside is registered.
     * @param event click that sent the event
     */
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
            <div ref={ref} className="new-quiz-modulo">
                <h1>New Quiz</h1>
                <div className="editable-content-wrapper">
                        <div className="textfield-wrapper">
                            <TextField defaultValue={title} className="new-quiz-textfield" variant="outlined" label="Title" onChange={(elem)=>setTitle(elem.target.value)}/>
                            <TextField defaultValue={description} multiline inputProps={{
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
                                    }}/>
                            </LocalizationProvider>
                            <FormControlLabel className="no-deadline" onClick={()=>setEnableDeadline(!enableDeadline)} control={<Switch className="switch-thumb"/>} label="No deadline" />
                            </div>
                        </div>
                        <div className="extras-wrapper">
                            <Autocomplete
                                key={quizDetails ? (quizDetails + courseID + courseOptions) : null}
                                className="new-quiz-textfield"
                                options={courseOptions}
                                getOptionLabel={(option) => option.name}
                                defaultValue={quizDetails ? (courseOptions.find((crs) => crs.id === quizDetails.courseId)) : null}
                                onChange={(elem, newValue) => {
                                    if (newValue) {
                                        setCourseID(newValue.id);
                                    }
                                    else {
                                        setCourseID("");
                                    }}}
                                renderInput={(params) => <TextField {...params} label="Course"/>}/>
                            <div className="quiz-cover-image">
                                <Button variant="contained" startIcon={<ImageIcon/>} component="label">Change<input type="file" hidden/></Button>
                            </div>
                            <Button sx={{fontSize: 17}} className="continue-button" variant="contained" onClick={()=>submitQuizDetails()}>Continue</Button>
                        </div>
                </div>
            </div>
        </div>
    )
}