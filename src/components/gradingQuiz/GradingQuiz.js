import React, {useEffect, useState} from 'react';
import './gradingquiz.css';
import QuestionBanner from "../questionBanner/QuestionBanner";
import axios from "axios";
import {useParams} from "react-router";
import {useSelector} from "react-redux";
import GradingQuestion from "../gradingQuestion/GradingQuestion";
import AnswerList from "../answerList/AnswerList";
import {Alert, CircularProgress} from '@mui/material';
import Snackbar from "@mui/material/Snackbar";
import WebSocketClient from "../websocketClient/WebSocketClient";

export default function GradingQuiz() {

    const isLogged = useSelector(state => state.isLoggedReducer);
    const [quiz, setQuiz] = useState({});
    const [course, setCourse] = useState("");
    const [currentQuestion, setCurrentQuestion] = useState(0);
    const [currentAnswer, setCurrentAnswer] = useState(0);
    const [loading, setLoading] = useState(true);
    let {id} = useParams();

    const [answers, setAnswers] = useState([])

    useEffect(() => {

        axios({
            method: "get",
            url: process.env.REACT_APP_URL+"/quiz/" + id,
            headers: {
                "Authorization": "Bearer " + isLogged.jwtToken
            }
        }).then(function (response) {
            if (response.status === 200) {
                let temp = response.data;
                temp.deployedQuiz = JSON.parse(temp.deployedQuiz);
                temp.deployedQuiz.questions = temp.deployedQuiz.questions.map((question) => JSON.parse(question));
                setQuiz(temp);
                getCourse(temp.courseId);
                //getAnswers();
            }
            }
        )
    }, []);

    function getCourse(thisCourseId) {
        axios({
            method: "get",
            url: process.env.REACT_APP_URL + "/course/" + thisCourseId,
            headers: {
                "Authorization": "Bearer " + isLogged.jwtToken
            }
        }).then(function (response) {
            setCourse(response.data);
        })
    }


    function gradeAnswers(answerIds, grade, feedback) {
        if (grade === -1) return;
        axios({
            method: "POST",
            url: process.env.REACT_APP_URL + "/quiz/gradeanswers",
            headers: {
                "Authorization": "Bearer " + isLogged.jwtToken
            },
            data: {
                answerIds: answerIds,
                grade: grade,
                feedback: feedback,
                deployedQuizId: id
            }
        }).then(function (response) {
            if (response.status === 200) {
                let tempAnswers = response.data;
                tempAnswers = tempAnswers.map((answers) => answers.map((answer) => JSON.parse(answer)));
                setAnswers(tempAnswers);
            }
        })
    }

    //TODO: Fix currentAnswer not being set to the first not graded answer but the first overall answer.

    return (
        <div className="grading-quiz">
            <WebSocketClient props={{jwtToken:isLogged.jwtToken,topic:"/topic/quizanswers/"+id}} autoReconnect={true} setAnswers={(newAns)=>{setAnswers(newAns);setLoading(false)}}/>
            {loading ?
                <div className="loading-overlay">
                    <CircularProgress className={"loading"}/>
                </div>
            : null}
            <QuestionBanner currentQuestion={currentQuestion}
                            quizLength={quiz.deployedQuiz ? quiz.deployedQuiz.quizLength : undefined}
                            setCurrentQuestion={(e) => {
                                if (answers[e][0]) {
                                    setCurrentAnswer(answers[e][0].id);
                                    setCurrentQuestion(e)
                                } else {
                                    setCurrentAnswer(0);
                                    setCurrentQuestion(e)
                                }
                            }}/>
            <div className={"grading-wrapper"}>
                {quiz.deployedQuiz && quiz.deployedQuiz.questions[currentQuestion].type === 1 ?
                    <div className="auto-graded-question-filter">
                        <Snackbar sx={{color: "white"}}
                                  open={quiz.deployedQuiz && quiz.deployedQuiz.questions[currentQuestion].type === 1}
                                  autoHideDuration={6000} anchorOrigin={{vertical: 'center', horizontal: 'center'}}>
                            <Alert severity="warning" sx={{
                                width: "100%",
                                color: "white",
                                backgroundColor: "#c6c30e",
                                fontSize: 15,
                                ".css-ptiqhd-MuiSvgIcon-root": {fontSize: 20},
                                ".MuiSvgIcon-root": {color: "white"}
                            }}>
                                This answer is autograded!
                            </Alert>
                        </Snackbar></div> : null}
                <div className="feedback-wrapper">
                    <h1 className="course-quiz-title">{course.name} > {quiz.deployedQuiz ? quiz.deployedQuiz.title : undefined}</h1>
                    <GradingQuestion gradeFunction={gradeAnswers}
                                     currentAnswer={answers[currentQuestion] && quiz.deployedQuiz.questions[currentQuestion].type !== 1 ? answers[currentQuestion].find((ans) => ans.id === currentAnswer) : undefined}
                                     questionIndex={currentQuestion + 1}
                                     question={quiz.deployedQuiz ? quiz.deployedQuiz.questions[currentQuestion] : undefined}/>
                </div>
                <AnswerList gradeFunction={gradeAnswers} setCurrentAnswerFunction={setCurrentAnswer}
                            currentQuestion={currentQuestion}
                            answers={quiz.deployedQuiz && quiz.deployedQuiz.questions[currentQuestion].type === 2 ? answers[currentQuestion] : {}}
                            question={quiz.deployedQuiz ? quiz.deployedQuiz.questions[currentQuestion] : undefined}/>
            </div>
        </div>
    )
}