import React, {useEffect, useState} from 'react';
import "./quiz.css";
import {useNavigate, useParams} from "react-router";
import axios from "axios";
import {useSelector} from "react-redux";
import QuizFrontPage from "../../components/quizFrontPage/QuizFrontPage";
import Question from "../../components/question/Question";
import QuestionBanner from "../../components/questionBanner/QuestionBanner";
import QuizNavigation from "../../components/quizNavigation/QuizNavigation";

/**
 * Page displaying a quiz for a student user
 * @returns page representing a quiz
 */
export default function Quiz() {
    let {id} = useParams();

    const navigate = useNavigate();
    const isLogged = useSelector(state => state.isLoggedReducer);
    const [quiz, setQuiz] = useState({});
    const [questionAnswers, setQuestionAnswers] = useState([]);
    const[checkedAnswers,setCheckedAnswers] = useState([]);
    const [quizAnswers, setQuizAnswers] = useState({
        "answers": [],
        "status": "in-progress",
        "courseId": ""
    });
    const [currentQuestion, setCurrentQuestion] = useState(-1);

    /**
     * Fetches the quiz along with the student answers if there are any
     */
    useEffect(() => {

        axios({
            method: "get",
            url: process.env.REACT_APP_URL + "/quiz/" + id,
            headers: {
                "Authorization": "Bearer " + isLogged.jwtToken
            }
        }).then(function (response) {
                let temp = response.data;
                temp.quiz = JSON.parse(temp.quiz);
                setQuiz(temp);
            }
        );


        axios({
            method: "get",
            url: process.env.REACT_APP_URL + "/user/quizanswers/" + id,
            headers: {
                "Authorization": "Bearer " + isLogged.jwtToken
            }
        }).then((response) => {

            saveQuizAnswers(response)
        });
    }, []);

    /**
     * Saves the quiz answers to the backend
     */
    function saveQuiz() {
        let temp = quizAnswers;
        temp.answers = questionAnswers;
        temp.courseId = quiz.courseId;
        axios({
            method: "post",
            url: process.env.REACT_APP_URL + "/user/saveanswer/" + id,
            headers: {
                "Authorization": "Bearer " + isLogged.jwtToken
            },
            data: temp

        });
    }

    /**
     * Save the answers to the quiz
     * @param response from the request
     */
    function saveQuizAnswers(response) {
        if (response.status === 200 && response.data !== "No answer" && response.data !== "Answers submitted") {

            let temp = response.data
            if (temp.answers !== undefined) {
                temp.answers = temp.answers.map((answer) => JSON.parse(answer));
                setQuestionAnswers(temp.answers);
            }
            setQuizAnswers(temp);
            let tempAnswers = temp.answers;
            tempAnswers = tempAnswers.map(ans => ans.answer.split(","))
            tempAnswers = tempAnswers.map(arry => arry.map(ansId => parseInt(ansId)))
            setCheckedAnswers(tempAnswers);

        }
    }

    /**
     * Ends the quiz and submits the answers. Redirects the user.
     */
    function endQuiz() {
        let temp = quizAnswers;
        temp.answers = questionAnswers;
        temp.courseId = quiz.courseId;
        axios({
            method: "post",
            url: process.env.REACT_APP_URL + "/user/submitanswer/" + id,
            headers: {
                "Authorization": "Bearer " + isLogged.jwtToken
            },
            data: temp

        });
        navigate("/");
    }


    return (
        <div className={"quiz-wrapper"}>
            {(quiz.quiz) ?
                (<div className={"quiz-frontpage-wrapper"}>
                    {(currentQuestion === -1) ?
                        (
                            <QuizFrontPage title={quiz.quiz.title} description={quiz.quiz.description}
                                           quizLength={quiz.quiz.quizLength} startQuiz={setCurrentQuestion}/>
                        )
                        : (quiz.quiz.questions.length <= 0) ?
                            <div className={"quiz-no-questions-wrapper"}>
                                <h1>This quiz has no questions</h1>
                            </div>
                            :
                            (
                                <div className={"question-page-wrapper"}>
                                    <QuestionBanner currentQuestion={currentQuestion} quizLength={quiz.quiz.quizLength}
                                                    setCurrentQuestion={setCurrentQuestion}/>
                                    <Question currAns={questionAnswers[currentQuestion]}
                                              question={JSON.parse(quiz.quiz.questions[currentQuestion])}
                                              currentQuestion={currentQuestion} setAnswer={(ans) => {
                                        let temp = questionAnswers;
                                        temp[currentQuestion] = ans;
                                        setQuestionAnswers(temp)
                                    }}/>
                                    <QuizNavigation quizLength={quiz.quiz.quizLength}
                                                    setCurrentQuestion={setCurrentQuestion}
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

