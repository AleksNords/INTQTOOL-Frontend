import React, {useEffect, useState} from 'react';
import './home.css';
import QuizCard from "../quizCard/QuizCard";
import axios from "axios";
import {useNavigate} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";

export default function Home() {
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const isLogged = useSelector(state => state.isLoggedReducer);
    const user = useSelector(state => state.userReducer);
    const [quizzes,setQuizzes] =useState([]);

    useEffect(()=>{
        axios({
            method:"get",
            url:"http://localhost:8080/user/quizzes",
            headers:{
                "Authorization":"Bearer "+isLogged.jwtToken
            }
        }).then(function (response){
                setQuizzes(response.data);
                console.log(response.data);
            }

        );
    },[]);





    return (
        <div className={"home"}>
            <div className={"quiz-type-navigator"}>
                <h1 className={"quiz-type-navigator-title quiz-type-navigator-title-enabled"}>Active Quizes</h1>
                <h1 className={"quiz-type-navigator-title quiz-type-navigator-title-disabled"} >Archived Quizes</h1></div>

                {quizzes.length >= 1 ?
                    (<div className={"quizcard-container"}>
                        {quizzes.map((quiz)=>{
                            quiz = JSON.parse(quiz);
                            return <QuizCard title={quiz.title}
                                             progression={10}/>
                        })}
                    </div>)
                    :
                    (<div className={"quizcard-container"}>No quizzes</div>)}

        </div>
    )
}