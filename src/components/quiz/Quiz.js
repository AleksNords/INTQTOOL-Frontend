import React, {useEffect, useState} from 'react';
import "./quiz.css";
import {useNavigate, useParams} from "react-router";
import axios from "axios";
import {useSelector} from "react-redux";
import QuizFrontPage from "../quizFrontPage/QuizFrontPage";
import Question from "../question/Question";
import QuestionBanner from "../questionBanner/QuestionBanner";
import QuizNavigation from "../quizNavigation/QuizNavigation";

export default function Quiz() {
    let {id} = useParams();

    const navigate = useNavigate();
    const isLogged = useSelector(state => state.isLoggedReducer);
    const [quiz, setQuiz] = useState({});
    const [questionAnswers, setQuestionAnswers] = useState([]);
    const [quizAnswers, setQuizAnswers] = useState({
        "answers": [],
        "status": "in-progress",
        "courseId": ""
    });
    const [currentQuestion, setCurrentQuestion] = useState(-1);

    useEffect(() => {

        axios({
            method: "get",
            url: process.env.REACT_APP_URL + "/quiz/" + id,
            headers: {
                "Authorization": "Bearer " + isLogged.jwtToken
            }
        }).then(function (response) {
            let temp = response.data;
            temp.deployedQuiz = JSON.parse(temp.deployedQuiz);
                setQuiz(temp);
                console.log(temp);
            }
        );


        axios({
            method: "get",
            url: process.env.REACT_APP_URL + "/user/quizanswers/" + id,
            headers: {
                "Authorization": "Bearer " + isLogged.jwtToken
            }
        }).then(function (response) {

                if (response.status === 200 && response.data !== "No answer" && response.data !== "Answers submitted") {

                    let temp = response.data
                    if (temp.answers !== undefined) {
                        temp.answers = temp.answers.map((answer) => JSON.parse(answer));
                        setQuestionAnswers(temp.answers);
                    }
                    setQuizAnswers(temp);
                    console.log("quizanswer fetch temp", temp);

                }
                console.log("test", quizAnswers);

            }
        );
    }, []);

    function saveQuiz() {
        let temp = quizAnswers;
        temp.answers = questionAnswers;
        temp.courseId = quiz.courseId;

        console.log(quizAnswers);
        axios({
            method: "post",
            url: process.env.REACT_APP_URL + "/user/saveanswer/"+id,
            headers: {
                "Authorization": "Bearer " + isLogged.jwtToken
            },
            data: temp

        }).then(function (response) {
                if (response.status === 200 && response.data !== "No answer" && response.data !== "Answers submitted") {

                    let temp = response.data
                    if (temp.answers !== undefined) {
                        temp.answers = temp.answers.map((answer) => JSON.parse(answer));
                        setQuestionAnswers(temp.answers);
                    }
                    setQuizAnswers(temp);
                }
            }
        );
    }

    function endQuiz() {
        let temp = quizAnswers;
        temp.answers = questionAnswers;
        temp.courseId = quiz.courseId;

        console.log(quizAnswers);
        axios({
            method: "post",
            url: process.env.REACT_APP_URL + "/user/submitanswer/"+id,
            headers: {
                "Authorization": "Bearer " + isLogged.jwtToken
            },
            data: temp

        }).then(function (response) {
                console.log(response.data);
            }
        );
        navigate("/");
    }


    return (

        <div className={"quiz-wrapper"}>
            {(quiz.deployedQuiz) ?
                (<div className={"quiz-frontpage-wrapper"}>
                    {(currentQuestion === -1) ?
                        (
                            <QuizFrontPage title={quiz.deployedQuiz.title} description={quiz.deployedQuiz.description}
                                           quizLength={quiz.deployedQuiz.quizLength} startQuiz={setCurrentQuestion}/>
                        )
                        :
                        (
                            <div className={"question-page-wrapper"}>
                                <QuestionBanner currentQuestion={currentQuestion} quizLength={quiz.deployedQuiz.quizLength}
                                                setCurrentQuestion={setCurrentQuestion}/>
                                <Question quizId={id} currAns={questionAnswers[currentQuestion]}
                                          question={JSON.parse(quiz.deployedQuiz.questions[currentQuestion])}
                                          currentQuestion={currentQuestion} setAnswer={(ans) => {
                                    let temp = questionAnswers;
                                    temp[currentQuestion] = ans;
                                    setQuestionAnswers(temp)
                                }}/>
                                <QuizNavigation quizLength={quiz.deployedQuiz.quizLength} setCurrentQuestion={setCurrentQuestion}
                                                currentQuestion={currentQuestion} endQuiz={() => endQuiz()}
                                                saveFunction={saveQuiz}/>
                            </div>
                        )}
                </div>) :
                (<div className={"quiz-not-loaded"}>

                </div>)
            }
        </div>

    );

}

