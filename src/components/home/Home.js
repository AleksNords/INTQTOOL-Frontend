import React, {useEffect, useState, useRef} from 'react';
import './home.css';
import QuizCard from "../quizCard/QuizCard";
import axios from "axios";
import {useDispatch, useSelector} from "react-redux";
import {Button} from "@mui/material";
import NewQuizModulo from "../modulo/newQuizModulo/NewQuizModulo";
import AddIcon from '@mui/icons-material/Add';

export default function Home() {

    const [showNewQuizModulo, setShowNewQuizModulo] = React.useState(false);
    const isLogged = useSelector(state => state.isLoggedReducer);
    const user = useSelector(state => state.userReducer);
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
            {showNewQuizModulo ? <div className="new-quiz-wrapper"><NewQuizModulo setShowFunction={setShowNewQuizModulo}/><div className="shadow-filter"/></div> : null}
            <div className={"quiz-type-navigator"}>
                <h1 id="Active-quiz-headers" onClick={(elem)=>toggleActiveArchiveQuiz(elem)} className={"quiz-type-navigator-title quiz-type-navigator-title-enabled"}>Active Quizes</h1>
                <h1 id="Archived-quiz-headers" onClick={(elem)=>toggleActiveArchiveQuiz(elem)} className={"quiz-type-navigator-title quiz-type-navigator-title-disabled"} >Archived Quizes</h1>
                <Button className="new-quiz" onClick={()=>setShowNewQuizModulo(true)} sx={{fontSize: 16}} variant={"contained"}  startIcon={<AddIcon/>}>New Quiz</Button>
            </div>

                {quizzes.length >= 1 && !showArchived ?
                    (<div className={"quizcard-container"}>
                        {quizzes.map((quiz)=>{
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