import React, {useEffect, useState} from 'react';
import './gradingquiz.css';
import QuestionBanner from "../questionBanner/QuestionBanner";
import axios from "axios";
import {useParams} from "react-router";
import {useSelector} from "react-redux";
import GradingQuestion from "../gradingQuestion/GradingQuestion";
import AnswerList from "../answerList/AnswerList";
import { Alert } from '@mui/material';
import Snackbar from "@mui/material/Snackbar";

export default function GradingQuiz() {

    const isLogged = useSelector(state => state.isLoggedReducer);
    const [quiz, setQuiz] = useState({});
    const [course, setCourse] = useState("");
    const [currentQuestion, setCurrentQuestion] = useState(0);
    const [currentAnswer, setCurrentAnswer] = useState(0);
    const url = "https://quiz.web-tek.ninja:8443";
    let {id} = useParams();

    const [answers, setAnswers] = useState([])

    useEffect(() => {

        axios({
            method: "get",
            url: url+"/quiz/" + id,
            headers: {
                "Authorization": "Bearer " + isLogged.jwtToken
            }
        }).then(function (response) {
            if (response.status === 200) {
                let temp = response.data;
                temp.deployedQuiz = JSON.parse(temp.deployedQuiz);
                temp.deployedQuiz.questions = temp.deployedQuiz.questions.map((question) => JSON.parse(question));
                setQuiz(temp);
                console.log(temp)
                getCourse(temp.courseId);
                getAnswers();
            }
            }
        )
    }, []);

    function getAnswers() {
        axios({
            method: "get",
            url: url +"/quiz/quizanswers/" + id,
            headers: {
                "Authorization": "Bearer " + isLogged.jwtToken
            }
        }).then(function (response) {
            let temp = response.data;
            temp = temp.map((answers) => answers.map((answer) => JSON.parse(answer)));
            setAnswers(temp);
            if(temp[0][0]) {
                setCurrentAnswer(temp[0][0].id);
            }
        })
    }

    function getCourse(thisCourseId) {
        axios({
            method: "get",
            url: url +"/course/" + thisCourseId,
            headers: {
                "Authorization": "Bearer " + isLogged.jwtToken
            }
        }).then(function (response) {
            setCourse(response.data);
        })
    }

    //function setCheckedFunction(answerId, newChecked) {
    //    let temp = answers;
    //    answers[answerId].checked = newChecked;
    //    setAnswers(temp);
    //}

    return (
        <div className="grading-quiz">
            <QuestionBanner currentQuestion={currentQuestion} quizLength={quiz.deployedQuiz ? quiz.deployedQuiz.quizLength : undefined} setCurrentQuestion={(e)=>{if(answers[e][0]){setCurrentAnswer(answers[e][0].id);setCurrentQuestion(e)}else{setCurrentAnswer(0);setCurrentQuestion(e)}}}/>
            <div className={"grading-wrapper"}>
                {quiz.deployedQuiz && quiz.deployedQuiz.questions[currentQuestion].type === 1 ? <div className="auto-graded-question-filter">
                    <Snackbar sx={{color: "white"}} open={quiz.deployedQuiz && quiz.deployedQuiz.questions[currentQuestion].type === 1} autoHideDuration={6000} anchorOrigin={{ vertical: 'center', horizontal: 'center' }} >
                    <Alert severity="warning" sx={{width: "100%", color: "white", backgroundColor: "#c6c30e", fontSize: 15, ".css-ptiqhd-MuiSvgIcon-root": {fontSize: 20}, ".MuiSvgIcon-root": {color: "white"} }}>
                        This answer is autograded!
                    </Alert>
                </Snackbar></div> : null}
                <div className="feedback-wrapper">
                    <h1 className="course-quiz-title">{course.name} > {quiz.deployedQuiz ? quiz.deployedQuiz.title : undefined}</h1>
                    <GradingQuestion currentAnswer={answers[currentQuestion] && quiz.deployedQuiz.questions[currentQuestion].type !== 1 ? answers[currentQuestion].find((ans) => ans.id === currentAnswer) : undefined} questionIndex={currentQuestion + 1} question={quiz.deployedQuiz ? quiz.deployedQuiz.questions[currentQuestion] : undefined}/>
                </div>
                <AnswerList setCurrentAnswerFunction={setCurrentAnswer} currentQuestion={currentQuestion} answers={quiz.deployedQuiz && quiz.deployedQuiz.questions[currentQuestion].type === 2 ? answers[currentQuestion] : {}} question={quiz.deployedQuiz ? quiz.deployedQuiz.questions[currentQuestion] : undefined}/>
            </div>
        </div>
    )
}