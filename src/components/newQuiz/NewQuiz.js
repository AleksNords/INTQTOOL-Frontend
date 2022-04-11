import React, {useEffect, useState} from "react";
import './newquiz.css';
import QuestionBanner from "../questionBanner/QuestionBanner";
import NewQuestion from "../newQuestion/NewQuestion";
import axios from "axios";
import {useNavigate, useParams} from "react-router";

export default function NewQuiz() {
    let {id} = useParams();
    const navigate = useNavigate();
    const [questionAmnt, setQuestionAmnt] = useState(1);
    const [quiz,setQuiz] = useState({});
    const [currentQuestion, setCurrentQuestion] = useState(0);
    const [questions, setQuestions] = useState([{
        questionText: "",
        isMultipleChoice: false,
        alternatives: [],
        hints: []
    }]);

    useEffect(()=>{
        axios({
                method: 'get',
                url: "http://10.212.26.200:8080/quiz/quizdetails/"+id

            }).then((response)=>{
                if(response.status === 200){
                    setQuiz(response.data)
                }
        })
    },[])

    function submitQuiz() {
        // let temp = quiz;
        // temp.questions = questions;
        // setQuiz(temp);
        // axios({
        //     method: 'post',
        //     url: "http://10.212.26.200:8080/newquiz",
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
            <QuestionBanner addQuestion={addQuestion} currentQuestion={currentQuestion} quizLength={questions.length} setCurrentQuestion={(e)=>setCurrentQuestion(e)} isNewQuizBanner={true}/>
            {questions.length > 0 ?
                <NewQuestion submitQuiz={submitQuiz} deleteQuestion={deleteQuestion} setIsMultipleChoice={setIsMultipleChoice} changeQuestionText={changeQuestionText} changeQuestionAlternatives={changeQuestionAlternatives} question={questions[currentQuestion]} questionIndex={currentQuestion} questionNumber={currentQuestion + 1} setQuestion={(question)=>{let temp = questions; temp[currentQuestion] = question;setQuestions(temp)}}/>
            : null}
        </div>
    )
}