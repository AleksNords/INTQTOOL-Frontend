import React, {useEffect, useState} from 'react';
import "./quiz.css";
import {useParams} from "react-router";
import axios from "axios";
import {useSelector} from "react-redux";
import QuizFrontPage from "../quizFrontPage/QuizFrontPage";
import Question from "../question/Question";
import QuestionBanner from "../questionBanner/QuestionBanner";
import QuizNavigation from "../quizNavigation/QuizNavigation";

export default function Quiz() {
    let {id} = useParams();

    const isLogged = useSelector(state => state.isLoggedReducer);
    const [quiz, setQuiz] = useState({});
    const [questionAnswers,setQuestionAnswers] = useState([]);
    const [currentQuestion, setCurrentQuestion] = useState(-1);

    useEffect(() => {
        axios({
            method: "get",
            url: "http://localhost:8080/quiz/" + id,
            headers: {
                "Authorization": "Bearer " + isLogged.jwtToken
            }
        }).then(function (response) {
                setQuiz(response.data);
            }
        );
    }, []);

    function endQuiz(){
        console.log(questionAnswers);
    }


    return (

        <div className={"quiz-wrapper"}>
            {(quiz.title !== null) || (quiz.title !== undefined) ?
                (<div className={"quiz-page-wrapper"}>
                    {(currentQuestion === -1) ?
                        (
                            <QuizFrontPage title={quiz.title} description={quiz.description} quizLength={quiz.quizLength} startQuiz={setCurrentQuestion}/>
                        )
                        :
                        (
                            <div className={"question-page-wrapper"}>
                                <QuestionBanner currentQuestion={currentQuestion} quizLength={quiz.quizLength} setCurrentQuestion={setCurrentQuestion}/>
                                <Question currAns={questionAnswers[currentQuestion]} question={JSON.parse(quiz.questions[currentQuestion])} currentQuestion={currentQuestion} setAnswer={(ans)=>{let temp = questionAnswers; temp[currentQuestion] = ans;setQuestionAnswers(temp)}}/>
                                <QuizNavigation quizLength={quiz.quizLength} setCurrentQuestion={setCurrentQuestion} currentQuestion={currentQuestion} endQuiz={()=> endQuiz()}/>
                            </div>
                        )}
                </div>) :
                (<div className={"quiz-not-loaded"}>

                </div>)
            }
        </div>

    );

}

