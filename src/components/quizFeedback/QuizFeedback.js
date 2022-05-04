import React, {useEffect, useState} from 'react';
import './quizfeedback.css';
import QuestionBanner from "../questionBanner/QuestionBanner";
import QuizResultsModal from "../quizResultsModal/QuizResultsModal";
import axios from "axios";
import {useParams} from "react-router";
import {useSelector} from "react-redux";
import {Backdrop, CircularProgress, FormControlLabel, RadioGroup, TextField} from "@mui/material";
import CheckIcon from '@mui/icons-material/Check';
import QuizNavigation from "../quizNavigation/QuizNavigation";
import CloseIcon from '@mui/icons-material/Close';
import PercentIcon from '@mui/icons-material/Percent';
import HourglassBottomIcon from '@mui/icons-material/HourglassBottom';
import Radio from "@mui/material/Radio";

export default function QuizFeedback() {

    const [currentQuestion, setCurrentQuestion] = useState(0);
    const isLogged = useSelector(state => state.isLoggedReducer);
    const [answeredQuiz, setAnsweredQuiz] = useState({});
    const [questions, setQuestions] = useState([]);
    const [loading, setLoading] = useState(true);
    const [showResultsModal, setShowResultsModal] = useState(false);
    let {id} = useParams();

    useEffect(() => {

        axios({
            method: "get",
            url: process.env.REACT_APP_URL + "/user/answeredquiz/" + id,
            headers: {
                "Authorization": "Bearer " + isLogged.jwtToken
            }
        }).then(function (response) {
                let temp = response.data;
                temp.answers = temp.answers.map((ans) => JSON.parse(ans));
                setAnsweredQuiz(temp);
                console.log(temp);
                getQuiz(temp.quizId);
            }
        );

    }, []);

    function getQuiz(quizId) {

        axios({
            method: "get",
            url: process.env.REACT_APP_URL + "/quiz/" + quizId,
            headers: {
                "Authorization": "Bearer " + isLogged.jwtToken
            }
        }).then(function (response) {
                let temp = response.data;
                temp.quiz = JSON.parse(temp.quiz);
                temp.quiz.questions = temp.quiz.questions.map((question) => JSON.parse(question));
                setQuestions([...temp.quiz.questions]);
                setLoading(false);
            }
        );
    }

    function getGradingSpan() {
        let grading = answeredQuiz.answers[currentQuestion].grading;
        let gradingSpan;
        switch (grading) {

            case 1:
                gradingSpan =
                    <span className="feedback feedback-correct"><CheckIcon sx={{fontSize: 50, fontWeight: "900"}}/>Correct!</span>;
                break;

            case 0.5:
                gradingSpan =
                    <span className="feedback feedback-partial"><PercentIcon sx={{fontSize: 50, fontWeight: "900"}}/>Partially correct</span>;
                break;

            case 0:
                if (answeredQuiz.answers[currentQuestion].status === "graded") {
                    gradingSpan = <span className="feedback feedback-incorrect"><CloseIcon
                        sx={{fontSize: 50, fontWeight: "900"}}/>Incorrect</span>;
                    break;
                }

            default:
                gradingSpan = <span className="feedback"><HourglassBottomIcon sx={{fontSize: 50, fontWeight: "900"}}/>Not graded</span>
                break;
        }
        return gradingSpan;
    }

    return (
        <div key={"quizanswer" + id} className="feedback-quiz">
            {loading ?
                <div className="loading-overlay">
                    <CircularProgress className={"loading"}/>
                </div>
                : <>
                    {showResultsModal ? <QuizResultsModal/> : null}
                <Backdrop sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }} open={showResultsModal} onClick={() => setShowResultsModal(false)}/>
                    <QuestionBanner currentQuestion={currentQuestion}
                                    quizLength={questions.length}
                                    setCurrentQuestion={setCurrentQuestion}/>
                    <h1 className="feedback-question-number">Question {currentQuestion + 1}</h1>
                    <h2 className="feedback-question-title">{questions[currentQuestion].questionText}</h2>
                    <div className="main-feedback-wrapper">
                    {
                        questions[currentQuestion].type === 1 ?
                            <div className="feedback-radio-wrapper">
                                <RadioGroup value={answeredQuiz.answers[currentQuestion].answer}>
                                    {
                                        questions[currentQuestion].alternatives.map((alternative) => {
                                            alternative = JSON.parse(alternative);
                                            return <FormControlLabel value={alternative.alternative}
                                                                     control={<Radio sx={{'& .MuiSvgIcon-root': {fontSize: 30,},
                                                                         '&.Mui-checked': {
                                                                             color: answeredQuiz.answers[currentQuestion].grading === 1 ? "#42C767" : "#F63E3E",
                                                                         }}}/>}
                                                                     label={alternative.alternative}/>;
                                        })
                                    }
                                </RadioGroup>
                            </div>
                            :
                            questions[currentQuestion].type === 2 ?
                                <div className="feedback-textfield-wrapper">
                                    <TextField key={"answer" + id + currentQuestion}
                                               value={answeredQuiz.answers[currentQuestion].answer} multiline rows={7}
                                               label="Your answer" className="feedback-textfield"
                                               InputLabelProps={{style: {fontSize: 24}}}
                                               InputProps={{style: {fontSize: 24}, readOnly: true}}/>
                                    <TextField key={"feedback" + id + currentQuestion}
                                               value={answeredQuiz.answers[currentQuestion].feedback} multiline rows={7}
                                               label="Feedback" className="feedback-textfield"
                                               InputLabelProps={{style: {fontSize: 24}}}
                                               InputProps={{style: {fontSize: 24}, readOnly: true}}/>
                                </div>
                                :
                                null
                    }
                    {getGradingSpan()}
                    </div>
                    <QuizNavigation quizLength={questions.length} setCurrentQuestion={setCurrentQuestion}
                                    currentQuestion={currentQuestion} endQuiz={() => {setShowResultsModal(true)}}
                                    saveFunction={null}/>
                </>
            }
        </div>
    )
}