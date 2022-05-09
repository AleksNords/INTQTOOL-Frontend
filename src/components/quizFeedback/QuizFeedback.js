import React, {useEffect, useState} from 'react';
import './quizfeedback.css';
import QuestionBanner from "../questionBanner/QuestionBanner";
import QuizResultsModal from "../quizResultsModal/QuizResultsModal";
import axios from "axios";
import {useParams} from "react-router";
import {useSelector} from "react-redux";
import {Backdrop, Checkbox, CircularProgress, FormControlLabel, FormGroup, RadioGroup, TextField} from "@mui/material";
import CheckIcon from '@mui/icons-material/Check';
import QuizNavigation from "../quizNavigation/QuizNavigation";
import CloseIcon from '@mui/icons-material/Close';
import PercentIcon from '@mui/icons-material/Percent';
import HourglassBottomIcon from '@mui/icons-material/HourglassBottom';
import Radio from "@mui/material/Radio";

/**
 * Page used to view feedback received on a quiz
 * @returns page element that displays quiz feedback
 */
export default function QuizFeedback() {

    const [checkedAnswers, setCheckedAnswers] = useState([]);
    const [currentQuestion, setCurrentQuestion] = useState(0);
    const isLogged = useSelector(state => state.isLoggedReducer);
    const [answeredQuiz, setAnsweredQuiz] = useState({});
    const [questions, setQuestions] = useState([]);
    const [loading, setLoading] = useState(true);
    const [showResultsModal, setShowResultsModal] = useState(false);
    let {id} = useParams();

    //collects quiz feedback data
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
                getQuiz(temp.deployedQuizId);
                setCheckedAnswers(temp.answers[currentQuestion].answer.split(",").map(id=>parseInt(id)));
            }
        );

    }, []);

    /**
     * Gets the quiz information to help the user understand what question has received what grading
     * @param quizId
     */
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

    /**
     * Chooses a span that displays the grading received on a question
     * @returns span representing the feedback on a question
     */
    function getGradingSpan() {
        let grading = answeredQuiz.answers[currentQuestion].grading;

        if (grading > 0 && grading < 1) {
            grading = 0.5;
        }

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
            //We enable the fall through as we want this span if none of the above conditions apply,
            //but the value is 0 if no grading is received, which means we need to check the status of the question
            default:
                gradingSpan = <span className="feedback"><HourglassBottomIcon sx={{fontSize: 50, fontWeight: "900"}}/>Not graded</span>
                break;
        }
        return gradingSpan;
    }

    /**
     * Determines the question content based on the question type.
     */
    function getQuestionContent() {

        switch (questions[currentQuestion].type) {

            case 1:
                return <div className="feedback-choice-wrapper">
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

            case 2:
                return <div className="feedback-textfield-wrapper">
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

            case 3:
                return <div className="feedback-choice-wrapper">
                    <FormGroup value={answeredQuiz.answers[currentQuestion].answer}>
                        {
                            questions[currentQuestion].alternatives.map((alternative) => {
                                alternative = JSON.parse(alternative);
                                return <FormControlLabel value={alternative.alternative}
                                                         control={<Checkbox checked={checkedAnswers ? checkedAnswers.includes(alternative.alternativeID) : false} sx={{'& .MuiSvgIcon-root': {fontSize: 30}}}/>}
                                                         label={alternative.alternative}/>;
                            })
                        }
                    </FormGroup>
                </div>
        }
    }

    return (
        <div key={"quizanswer" + id} className="feedback-quiz">
            {loading ?
                <div className="loading-overlay">
                    <CircularProgress className={"loading"}/>
                </div>
                : <>
                    {showResultsModal ? <QuizResultsModal setCurrentQuestion={setCurrentQuestion} setShowResultsModal={setShowResultsModal} resultArray={answeredQuiz.answers}/> : null}
                <Backdrop sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }} open={showResultsModal} onClick={() => setShowResultsModal(false)}/>
                    <QuestionBanner currentQuestion={currentQuestion}
                                    quizLength={questions.length}
                                    setCurrentQuestion={setCurrentQuestion}/>
                    <h1 className="feedback-question-number">Question {currentQuestion + 1}</h1>
                    <h2 className="feedback-question-title">{questions[currentQuestion].questionText}</h2>
                    <div className="main-feedback-wrapper">
                    {getQuestionContent()}
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