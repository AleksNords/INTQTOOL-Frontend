import React, {useEffect, useState} from 'react';
import './home.css';
import QuizCard from "../quizCard/QuizCard";
import axios from "axios";
import {useDispatch, useSelector} from "react-redux";
import {Button} from "@mui/material";
import NewQuiz from "../modulo/newQuiz/NewQuiz";
import AddIcon from '@mui/icons-material/Add';

export default function Home() {
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
            }
        ).catch(function (response){
        });
    },[]);

    return (
        <div className={"home"}>
            <NewQuiz/>
            <div className="shadow-filter"/>
            <div className={"quiz-type-navigator"}>
                <h1 className={"quiz-type-navigator-title quiz-type-navigator-title-enabled"}>Active Quizes</h1>
                <h1 className={"quiz-type-navigator-title quiz-type-navigator-title-disabled"} >Archived Quizes</h1>
                <Button className="new-quiz" sx={{fontSize: 16}} variant={"contained"}  startIcon={<AddIcon/>}>New Quiz</Button>
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