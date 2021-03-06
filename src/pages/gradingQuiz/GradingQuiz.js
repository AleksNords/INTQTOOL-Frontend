import React, {useEffect, useState} from 'react';
import './gradingquiz.css';
import QuestionBanner from "../../components/questionBanner/QuestionBanner";
import axios from "axios";
import {Navigate, useParams} from "react-router";
import {useSelector} from "react-redux";
import GradingQuestion from "../../components/gradingQuestion/GradingQuestion";
import AnswerList from "../../components/answerList/AnswerList";
import {Alert, CircularProgress} from '@mui/material';
import Snackbar from "@mui/material/Snackbar";
import WebSocketClient from "../../components/websocketClient/WebSocketClient";

/**
 * Page used by teachers or administrators to grade a quiz
 * @returns page used to grade a quiz
 */
export default function GradingQuiz() {

    const isLogged = useSelector(state => state.isLoggedReducer);
    const user = useSelector(state => state.userReducer);
    const [quiz, setQuiz] = useState({});
    const [course, setCourse] = useState("");
    const [currentQuestion, setCurrentQuestion] = useState(0);
    const [currentAnswer, setCurrentAnswer] = useState(0);
    const [loading, setLoading] = useState(true);
    let {id} = useParams();

    const [answers, setAnswers] = useState([])

    /**
     * Fetches the course and the answers submitted by students
     */
    useEffect(() => {

        axios({
            method: "get",
            url: process.env.REACT_APP_URL + "/quiz/" + id,
            headers: {
                "Authorization": "Bearer " + isLogged.jwtToken
            }
        }).then(function (response) {
                if (response.status === 200) {
                    let temp = response.data;
                    temp.quiz = JSON.parse(temp.quiz);
                    temp.quiz.questions = temp.quiz.questions.map((question) => JSON.parse(question));
                    setQuiz(temp);
                    getCourse(temp.courseId);
                }
            }
        )
    }, []);

    /**
     * Fetches the course of the quiz
     * @param thisCourseId
     */
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

    /**
     * Grades the provided answers
     * @param answerIds of the answers
     * @param grade given grade
     * @param feedback
     */
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

    /**
     * Method called when a websocket message is received
     * @param data from the websocket message
     */
    function onMessageReceived(data) {

        let tempAnswers = data;
        tempAnswers.content = JSON.parse(tempAnswers.content).map(question => question.map(ans => JSON.parse(ans)));
        setAnswers(tempAnswers.content)
        console.log(tempAnswers.content)
        setLoading(false)
    }

    //TODO: Fix currentAnswer not being set to the first not graded answer but the first overall answer.

    return (
        <div className="grading-quiz">
            {
                //redirect unauthorized users to homepage
                (!user.user.roles.includes("ROLE_ADMIN") && !user.user.roles.includes("ROLE_TEACHER"))
                    ? <Navigate to={{pathname: '/'}}/>
                    : null
            }
            <WebSocketClient props={{jwtToken: isLogged.jwtToken, topic: "/topic/quizanswers/" + id}}
                             autoReconnect={true} onMessageReceived={onMessageReceived}/>
            {loading ?
                <div className="loading-overlay">
                    <CircularProgress className={"loading"}/>
                </div>
                : null}
            <QuestionBanner currentQuestion={currentQuestion}
                            quizLength={quiz.quiz ? quiz.quiz.quizLength : undefined}
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
                {quiz.quiz && (quiz.quiz.questions[currentQuestion].type === 1 || quiz.quiz.questions[currentQuestion].type === 3) ?
                    <div className="auto-graded-question-filter">
                        <Snackbar sx={{color: "white"}}
                                  open={quiz.quiz.questions[currentQuestion].type === 1 || quiz.quiz.questions[currentQuestion].type === 3}
                                  autoHideDuration={6000} anchorOrigin={{vertical: 'bottom', horizontal: 'center'}}>
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
                    <h1 className="course-quiz-title">{course.name} > {quiz.quiz ? quiz.quiz.title : undefined}</h1>
                    {quiz.quiz ?
                        <GradingQuestion
                            answers={answers[currentQuestion]}
                            questionIndex={currentQuestion + 1}
                            question={quiz.quiz ? quiz.quiz.questions[currentQuestion] : undefined}/>
                        : null}

                </div>
                {
                    answers[currentQuestion] ? (
                        <AnswerList gradeFunction={gradeAnswers} setCurrentAnswerFunction={setCurrentAnswer}
                                    currentQuestion={currentQuestion}
                                    answers={quiz.quiz && quiz.quiz.questions[currentQuestion].type === 2 ? answers[currentQuestion] : {}}
                                    question={quiz.quiz ? quiz.quiz.questions[currentQuestion] : undefined}/>
                    ): null
                }

            </div>
        </div>
    )
}