import React, {useEffect, useState} from 'react';
import './answerlist.css';
import {Fade, FormControlLabel, IconButton, Radio, RadioGroup, Slide, TextField} from "@mui/material";
import SearchIcon from '@mui/icons-material/Search';
import CheckIcon from "@mui/icons-material/Check";
import CloseIcon from "@mui/icons-material/Close";
import PercentIcon from "@mui/icons-material/Percent";
import CommentIcon from '@mui/icons-material/Comment';
import SendIcon from '@mui/icons-material/Send';
import AnswerCard from "../answerCard/AnswerCard";
import Snackbar from "@mui/material/Snackbar";
import {Alert} from "@mui/lab";

/**
 * List of answers that have been submitted by students for a single question
 * @param answers the answers for the entire quiz
 * @param setCurrentAnswerFunction function that sets the current answer in a parent element
 * @param currentQuestion the current question that is chosen in a parent element
 * @param gradeFunction function that grades an answer
 * @returns component that lists all answers for a question
 */
export default function AnswerList({answers, setCurrentAnswerFunction, currentQuestion, gradeFunction}) {

    const [search, setSearch] = useState("");
    const [showToolBar, setShowToolbar] = useState(false);
    const [showToolbarFeedback, setshowToolbarFeedback] = useState(false);
    const [showAnswerGraded, setShowAnswerGraded] = useState(false);
    const [checkedAnswers, setCheckedAnswers] = useState([]);

    const [toolbarFeedback, setToolbarFeedback] = useState("");
    const [grade, setGrade] = useState(-1);

    let ungradedAnswers = [];
    let gradedAnswers = [];
    if(answers){
        for (let i = 0; i < answers.length; i++) {

            if (answers[i].status !== "graded") {
                ungradedAnswers.push(<AnswerCard isGraded={false}
                                                 setCurrentAnswerFunction={setCurrentAnswerFunction} answer={answers[i]}
                                                 setCheckedFunction={setChecked}/>);
            } else {
                gradedAnswers.push(<AnswerCard isGraded={true}
                                               setCurrentAnswerFunction={setCurrentAnswerFunction} answer={answers[i]}
                                               setCheckedFunction={setChecked}/>);
            }
        }
    }


    const handleCloseSnackbar = () => {
        setShowAnswerGraded(false);
    };

    /**
     * Sets an answer as checked or unchecked. Checked answers may be batch graded
     * @param answerId the id of the answer to be changed
     * @param isChecked the new checked value for the answer
     */
    function setChecked(answerId, isChecked) {
        if (isChecked) {
            let temp = checkedAnswers;
            temp.push(answers.find((ans) => ans.id === answerId));
            setCheckedAnswers([...temp]);
        } else {
            let temp = checkedAnswers;
            temp.splice(checkedAnswers.findIndex((ans) => ans.id === answerId), 1);
            setCheckedAnswers([...temp]);
        }
        if (checkedAnswers.length > 0) {
            setShowToolbar(true);
        } else {
            setShowToolbar(false);
        }
    }

    /**
     * Batch grades the checked answers. Resets certain states like the toolbar feedback and the show boolean for the toolbar.
     */
    function gradeMultipleQuestions() {
        if (grade === -1) return;
        let answerIds = [];
        for (let i = 0; i < checkedAnswers.length; i++) {
            answerIds.push(checkedAnswers[i].id);
        }
        setShowToolbar(false);
        setCheckedAnswers([]);
        gradeFunction(answerIds, grade, toolbarFeedback);
        setToolbarFeedback("");
        setshowToolbarFeedback(false);
        setShowAnswerGraded(true);
    }

    //Resets values that should be reset when a new question is selected
    useEffect(() => {
        setCheckedAnswers([]);
        setShowToolbar(false);
        setSearch("");
    }, [answers])

    //TODO: add error message when trying to submit grading without choosing a grade

    return (
        <div className="answer-list">
            <Snackbar sx={{color: "white"}} open={showAnswerGraded} autoHideDuration={6000}
                      onClose={handleCloseSnackbar} anchorOrigin={{vertical: 'bottom', horizontal: 'right'}}>
                <Alert onClose={handleCloseSnackbar} severity="success" sx={{
                    width: "100%",
                    color: "white",
                    backgroundColor: "#40aa5a",
                    fontSize: 15,
                    ".css-ptiqhd-MuiSvgIcon-root": {fontSize: 20},
                    ".MuiSvgIcon-root": {color: "white"}
                }}>
                    Selected answer(s) have been graded!
                </Alert>
            </Snackbar>
            <div className="answer-list-header">
                <h1 key={answers.length ? (answers + answers.length):null} className="answer-list-title answer-list-header-item">Student answers
                    ({answers.length && answers.length > 0 ? checkedAnswers.length : 0})</h1>
                <TextField className="answer-list-header-item"
                           key={answers + currentQuestion + 1}
                           label={<div><SearchIcon sx={{fontSize: 20}}/>Search</div>}
                           InputLabelProps={{style: {fontSize: 18}}} InputProps={{style: {fontSize: 18}}}
                           value={search}
                           onChange={(elem) => {
                               setSearch(elem.target.value)
                           }}/>
            </div>
            {
                answers.length && answers.length > 0 ?
                    <span className="selected-amount">{checkedAnswers.length} selected </span>
                    : null
            }
            <div className="answer-card-wrapper">
                {search === "" ?
                    (ungradedAnswers.concat(gradedAnswers))
                    :
                    (ungradedAnswers.concat(gradedAnswers)).filter((ans) => ans.props.answer.answer.toLowerCase().includes(search.toLowerCase()))
                }
            </div>
            <Slide direction="up" in={showToolBar} mountOnEnter unmountOnExit>
                <div className="grading-toolbar">
                    <Fade in={showToolbarFeedback}>
                        <TextField focused={true} inputRef={input => input && input.focus()} multiline rows={3}
                                   defaultValue={toolbarFeedback} onChange={(e) => setToolbarFeedback(e.target.value)}
                                   className="toolbar-feedback-textfield"/>
                    </Fade>
                    <RadioGroup onChange={(e) => setGrade(e.target.value)}
                                className="credit-radio-wrapper toolbar-radio-wrapper" row>
                        <FormControlLabel label="" className="grading-button" value={1}
                                          control={<Radio TouchRippleProps={{sx: {color: "#42c767"}}}
                                                          className="grading-radio"
                                                          icon={<CheckIcon sx={{fontSize: 40}}/>}
                                                          checkedIcon={<CheckIcon
                                                              sx={{fontSize: 40, color: "#42c767"}}/>}
                                                          size={"large"}/>}/>
                        <FormControlLabel label="" className="grading-button" value={0}
                                          control={<Radio TouchRippleProps={{sx: {color: "#F63E3E"}}}
                                                          className="grading-radio"
                                                          icon={<CloseIcon sx={{fontSize: 40}}/>}
                                                          checkedIcon={<CloseIcon
                                                              sx={{fontSize: 40, color: "#f63e3e"}}/>}
                                                          size={"large"}/>}/>
                        <FormControlLabel label="" className="grading-button" value={0.5}
                                          control={<Radio TouchRippleProps={{sx: {color: "#F0C11B"}}}
                                                          className="grading-radio"
                                                          icon={<PercentIcon sx={{fontSize: 40}}/>}
                                                          checkedIcon={<PercentIcon
                                                              sx={{fontSize: 40, color: "#f0c11b"}}/>}
                                                          size={"large"}/>}/>
                    </RadioGroup>
                    <div className="toolbar-button-wrapper">
                        <IconButton onClick={() => setshowToolbarFeedback(!showToolbarFeedback)}
                                    TouchRippleProps={{sx: {color: "#2f7ed9"}}}><CommentIcon
                            sx={{fontSize: 40, color: "#2f7ed9"}}/></IconButton>
                        <IconButton onClick={() => gradeMultipleQuestions()}
                                    TouchRippleProps={{sx: {color: "#42C767"}}}><SendIcon
                            sx={{fontSize: 40, color: "#42C767"}}/></IconButton>
                    </div>
                </div>
            </Slide>
        </div>
    )
}