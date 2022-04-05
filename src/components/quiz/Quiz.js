import React, {useEffect, useState} from 'react';
import "./quiz.css";
import {useParams} from "react-router";
import axios from "axios";
import {useSelector} from "react-redux";
import QuizFrontPage from "../quizFrontPage/QuizFrontPage";
import Question from "../question/Question";

export default function Quiz() {
    let {id} = useParams();

    const isLogged = useSelector(state => state.isLoggedReducer);
    const [quiz, setQuiz] = useState({});
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
                console.log(response.data);
            }
        );
    }, []);




    return (

        <div className={"quiz-wrapper"}>
            {(quiz.title !== null) || (quiz.title !== undefined) ?
                (<div className={"quiz-frontpage-wrapper"}>
                    {(currentQuestion === -1) ?
                        (
                            <QuizFrontPage title={quiz.title} description={quiz.description} quizLength={quiz.quizLength} startQuiz={setCurrentQuestion}/>
                        )
                        :
                        (
                            <div>
                                <Question question={JSON.parse(quiz.questions[currentQuestion])}/>
                            </div>
                        )}
                </div>) :
                (<div className={"quiz-not-loaded"}>

                </div>)
            }
        </div>

    );

}
