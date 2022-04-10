import React, {useEffect, useState} from 'react';
import './home.css';
import QuizCard from "../quizCard/QuizCard";
import axios from "axios";
import {useSelector} from "react-redux";

export default function Home() {

    const isLogged = useSelector(state => state.isLoggedReducer);
    const [quizzes,setQuizzes] =useState([]);

    useEffect(()=>{
        axios({
            method:"get",
            url:"http://10.212.26.200:8080/user/quizzes",
            headers:{
                "Authorization":"Bearer "+isLogged.jwtToken
            }
        }).then(function (response){
                setQuizzes(response.data);
            }

        ).catch(function (response){

        });
    },[]);





    return (
        <div className={"home"}>
            <div className={"quiz-type-navigator"}>
                <h1 className={"quiz-type-navigator-title quiz-type-navigator-title-enabled"}>Active Quizes</h1>
                <h1 className={"quiz-type-navigator-title quiz-type-navigator-title-disabled"} >Archived Quizes</h1>
            </div>

                {quizzes.length >= 1 ?
                    (<div className={"quizcard-container"}>
                        {quizzes.map((quiz)=>{
                            quiz = JSON.parse(quiz);
                            return <QuizCard title={quiz.title} quizId={quiz.id}
                                             progression={10}/>
                        })}
                    </div>)
                    :
                    (<div className={"no-quiz-container"}><h1 className={"no-quizzes-prompt"}>You have no active quizzes</h1></div>)}

        </div>
    )
}