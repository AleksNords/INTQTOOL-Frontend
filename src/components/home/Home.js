import React, {useEffect, useState} from 'react';
import './home.css';
import QuizCard from "../quizCard/QuizCard";
import axios from "axios";
import {useSelector} from "react-redux";

export default function Home() {

    const isLogged = useSelector(state => state.isLoggedReducer);
    const [quizzes,setQuizzes] =useState([]);
    const [showArchived,setShowArchived] = useState(false);

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

    function toggleActiveArchiveQuiz(elem){
        let activeQuizElem = document.getElementById("Active-quiz-headers");
        let archivedQuizElem = document.getElementById("Archived-quiz-headers");
        if(elem.target.id === "Active-quiz-headers"){
            activeQuizElem.className = "quiz-type-navigator-title quiz-type-navigator-title-enabled"
            archivedQuizElem.className = "quiz-type-navigator-title quiz-type-navigator-title-disabled"
            setShowArchived(false);

        }else if(elem.target.id === "Archived-quiz-headers"){
            activeQuizElem.className = "quiz-type-navigator-title quiz-type-navigator-title-disabled"
            archivedQuizElem.className = "quiz-type-navigator-title quiz-type-navigator-title-enabled"
            setShowArchived(true);
        }

    }





    return (
        <div className={"home"}>
            <div className={"quiz-type-navigator"}>
                <h1 id="Active-quiz-headers" onClick={(elem)=>toggleActiveArchiveQuiz(elem)} className={"quiz-type-navigator-title quiz-type-navigator-title-enabled"}>Active Quizes</h1>
                <h1 id="Archived-quiz-headers" onClick={(elem)=>toggleActiveArchiveQuiz(elem)} className={"quiz-type-navigator-title quiz-type-navigator-title-disabled"} >Archived Quizes</h1>
            </div>

                {quizzes.length >= 1 && !showArchived ?
                    (<div className={"quizcard-container"}>
                        { quizzes.map((quiz)=>{
                            quiz = JSON.parse(quiz);
                            return <QuizCard title={quiz.title} quizId={quiz.id}
                                             progression={10}/>
                        })}
                    </div>)
                    :showArchived ? (<div className={"no-quiz-container"}><h1 className={"no-quizzes-prompt"}>You have no archived quizzes</h1></div>)
                        :
                    (<div className={"no-quiz-container"}><h1 className={"no-quizzes-prompt"}>You have no active quizzes</h1></div>)}

        </div>
    )
}