import React, {useEffect, useState} from "react";
import './newquiz.css';
import QuestionBanner from "../questionBanner/QuestionBanner";
import NewQuestion from "../newQuestion/NewQuestion";
import axios from "axios";
import {useNavigate, useParams} from "react-router";
import {Button} from "@mui/material";
import SettingsIcon from "@mui/icons-material/Settings";
import ArrowRightIcon from "@mui/icons-material/ArrowRight";
import NewQuizModulo from "../modulo/newQuizModulo/NewQuizModulo";
import Snackbar from "@mui/material/Snackbar";
import MuiAlert from "@mui/material/Alert";

export default function NewQuiz() {

    const Alert = React.forwardRef(function Alert(props, ref) {
        return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
    });

    let {id} = useParams();
    const [showNewQuizModulo, setShowNewQuizModulo] = useState(false);
    const [showSavedQuiz, setShowSavedQuiz] = useState(false);
    const navigate = useNavigate();
    const [questionAmnt, setQuestionAmnt] = useState(1);
    const [quiz, setQuiz] = useState({});
    const [currentQuestion, setCurrentQuestion] = useState(0);
    const url = "https://quiz.web-tek.ninja:8443";
    const [questions, setQuestions] = useState([{
        questionText: "",
        isMultipleChoice: false,
        alternatives: [],
        hints: []
    }]);

    useEffect(()=>{
        axios({
                method: 'get',
                url: url+"/quiz/quizdetails/"+id

            }).then((response)=>{
                if(response.status === 200){
                    setQuiz(response.data)
                }
        })
    },[])

    const handleCloseSnackbar = () => {
        setShowSavedQuiz(false);
    };

    function submitQuiz() {
        // let temp = quiz;
        // temp.questions = questions;
        // setQuiz(temp);
        // axios({
        //     method: 'post',
        //     url: "https://quiz.web-tek.ninja:8080/newquiz",
        //     data: temp
        // }).then((response)=>{
        //     if(response.status){
        //         navigate("/");
        //     }
        // })
        navigate("/");
    }

    function addQuestion() {
        let temp = questions;
        temp.push({
            questionText: "",
            isMultipleChoice: false,
            alternatives: [],
            hints: []
        });
        setQuestions(temp);
        setCurrentQuestion(questions.length - 1);
        setQuestionAmnt(questionAmnt + 1);
    }

    function changeQuestionText(index, newQuestionText) {
        let temp = questions;
        temp[index].questionText = newQuestionText;
        setQuestions(temp);
    }

    function changeQuestionAlternatives(index, newAlternatives) {
        let temp = questions;
        temp[index].alternatives = newAlternatives;
        setQuestions(temp);
    }

    function changeQuestionHints(index, newHints) {
        let temp = questions;
        temp[index].hints = newHints;
        setQuestions(temp);
    }

    function setIsMultipleChoice(index, newValue) {
        let temp = questions;
        temp[index].isMultipleChoice = newValue;
        setQuestions(temp);
    }

    function deleteQuestion(index) {
        if (questions.length > 1) {
            let temp = questions;
            temp.splice(index, 1);
            setQuestions(temp);
            setQuestionAmnt(questionAmnt - 1);
            if (currentQuestion !== 0) {
                setCurrentQuestion(currentQuestion - 1);
            } else {
                setCurrentQuestion(0);
            }
        }
    }

    return (
        <div className="new-quiz-page">
            <Snackbar open={showSavedQuiz} autoHideDuration={6000} onClose={handleCloseSnackbar} anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }} >
                <Alert onClose={handleCloseSnackbar} severity="success" sx={{width: "100%", backgroundColor: "#40aa5a", fontSize: 15, "& .css-ptiqhd-MuiSvgIcon-root": {fontSize: 20}}}>
                    Your quiz has been updated!
                </Alert>
            </Snackbar>
            {showNewQuizModulo ? <div className="new-quiz-wrapper"><NewQuizModulo setShowSavedQuiz={setShowSavedQuiz} setShowFunction={setShowNewQuizModulo}/><div className="shadow-filter"/></div> : null}
            <QuestionBanner addQuestion={addQuestion} currentQuestion={currentQuestion} quizLength={questions.length} setCurrentQuestion={(e)=>setCurrentQuestion(e)} isNewQuizBanner={true}/>
            {questions.length > 0 ?
                <NewQuestion submitQuiz={submitQuiz} deleteQuestion={deleteQuestion} setIsMultipleChoice={setIsMultipleChoice} changeQuestionText={changeQuestionText} changeQuestionAlternatives={changeQuestionAlternatives} changeQuestionHints={changeQuestionHints} question={questions[currentQuestion]} questionIndex={currentQuestion} questionNumber={currentQuestion + 1} setQuestion={(question)=>{let temp = questions; temp[currentQuestion] = question;setQuestions(temp)}}/>
            : null}
            <div className="new-quiz-button-wrapper">
                <Button onClick={()=> setShowNewQuizModulo(true)} variant="contained" sx={{fontSize: 16, backgroundColor: "#0665bf", ":hover": {backgroundColor: "#00509e"}}} className="new-quiz-button" startIcon={<SettingsIcon/>}>options</Button>
                <Button onClick={()=> submitQuiz()} variant="contained" sx={{fontSize: 16, backgroundColor: "#42C767", ":hover": {backgroundColor: "#40AA5A"}}} className="new-quiz-button" endIcon={<ArrowRightIcon/>}>submit</Button>
            </div>
        </div>
    )
}