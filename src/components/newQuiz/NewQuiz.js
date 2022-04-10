import React, {useState} from "react";
import './newquiz.css';
import QuestionBanner from "../questionBanner/QuestionBanner";
import Question from "../question/Question";
import NewQuestion from "../newQuestion/NewQuestion";

export default function NewQuiz() {

    const [currentQuestion, setCurrentQuestion] = useState(0);
    const [questions, setQuestions] = useState([{
        questionText: "",
        type: "",
    }]);

    function addQuestion() {
        let temp = questions;
        temp.push({
            questionText: "",
            type: "",
        });
        setQuestions(temp);
        setCurrentQuestion(questions.length - 1);
    }

    return (
        <div className="new-quiz-page">
            <QuestionBanner addQuestion={addQuestion} currentQuestion={currentQuestion} quizLength={questions.length} setCurrentQuestion={(e)=>setCurrentQuestion(e)} isNewQuizBanner={true}/>
            <NewQuestion questionNumber={currentQuestion + 1} setQuestion={(question)=>{let temp = questions; temp[currentQuestion] = question;setQuestions(temp)}}/>
        </div>
    )
}