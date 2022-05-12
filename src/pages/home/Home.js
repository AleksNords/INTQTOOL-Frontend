import React, {useEffect, useState} from 'react';
import './home.css';
import QuizCard from "../../components/quizCard/QuizCard";
import axios from "axios";
import {useSelector} from "react-redux";
import {Button} from "@mui/material";
import NewQuizModulo from "../../components/modulo/newQuizModulo/NewQuizModulo";
import AddIcon from '@mui/icons-material/Add';

/**
 * Home page of the application
 * @returns the home page
 */
export default function Home() {

    const [showNewQuizModulo, setShowNewQuizModulo] = React.useState(false);
    const isLogged = useSelector(state => state.isLoggedReducer);
    const user = useSelector(state => state.userReducer);
    const [quizzes, setQuizzes] = useState([]);
    const [quizAnswers, setquizAnswers] = useState([]);
    const [showArchived, setShowArchived] = useState(false);

    /**
     * Fetches the quizzes that the user currently can interact with
     */
    useEffect(() => {
        axios({
            method: "get",
            url: process.env.REACT_APP_URL + "/user/quizzes",
            headers: {
                "Authorization": "Bearer " + isLogged.jwtToken
            }
        }).then(function (response) {
                setQuizzes(response.data);
            }
        ).catch(function (response) {
        });
        updateQuizAnswers()
    }, []);

    /**
     * Updates/fetches the quiz answers
     */
    function updateQuizAnswers() {
        let urlPath;
        if (user.user.roles.includes("ROLE_ADMIN") || user.user.roles.includes("ROLE_TEACHER")) {
            urlPath = "/quiz/expiredquizzes"
        } else {
            urlPath = "/user/archivedquizzes"
        }
        axios({
            url: process.env.REACT_APP_URL + urlPath,
            method: 'get',
            headers: {
                "Authorization": "Bearer " + isLogged.jwtToken
            }
        }).then((response) => {
            if (response.status === 200) {
                let temp = response.data;
                temp = temp.map((qa) => JSON.parse(qa))
                setquizAnswers(temp);
            }
        })
    }

    /**
     * Toggles which quizzes to display between active and archived
     * @param elem on click event
     */
    function toggleActiveArchiveQuiz(elem) {
        let activeQuizElem = document.getElementById("Active-quiz-headers");
        let archivedQuizElem = document.getElementById("Archived-quiz-headers");
        if (elem.target.id === "Active-quiz-headers") {
            activeQuizElem.className = "quiz-type-navigator-title quiz-type-navigator-title-enabled"
            archivedQuizElem.className = "quiz-type-navigator-title quiz-type-navigator-title-disabled"
            setShowArchived(false);

        } else if (elem.target.id === "Archived-quiz-headers") {
            activeQuizElem.className = "quiz-type-navigator-title quiz-type-navigator-title-disabled"
            archivedQuizElem.className = "quiz-type-navigator-title quiz-type-navigator-title-enabled"
            setShowArchived(true);
            updateQuizAnswers();
        }

    }

    return (
        <div className={"home"}>
            {showNewQuizModulo ?
                <div className="new-quiz-wrapper"><NewQuizModulo setShowFunction={setShowNewQuizModulo}/>
                    <div className="shadow-filter"/>
                </div> : null}
            <div className={"quiz-type-navigator"}>
                <h1 id="Active-quiz-headers" onClick={(elem) => toggleActiveArchiveQuiz(elem)}
                    className={"quiz-type-navigator-title quiz-type-navigator-title-enabled"}>Active Quizzes</h1>
                <h1 id="Archived-quiz-headers" onClick={(elem) => toggleActiveArchiveQuiz(elem)}
                    className={"quiz-type-navigator-title quiz-type-navigator-title-disabled"}>Answered Quizzes</h1>
                {
                    (user.user.roles) ? (
                        (user.user.roles.includes("ROLE_TEACHER")) || (user.user.roles.includes("ROLE_ADMIN")) ? (
                            <Button className="new-quiz" onClick={() => setShowNewQuizModulo(true)} sx={{fontSize: 16}}
                                    variant={"contained"} startIcon={<AddIcon/>}>New Quiz</Button>
                        ) : null) : null
                }
            </div>

            {quizzes.length >= 1 && !showArchived ?
                (<div className={"quizcard-container"}>
                    {quizzes.map((deployedquiz) => {
                        deployedquiz = JSON.parse(deployedquiz);
                        let quiz = JSON.parse(deployedquiz.quiz)
                        return <QuizCard quizLength={quiz.quizLength} title={quiz.title} quizId={deployedquiz.id}
                                         progression={10} userNavigateTo={"quiz"}/>
                    })}
                </div>)
                : showArchived && quizAnswers.length < 1 ? (
                        <div className={"no-quiz-container"}><h1 className={"no-quizzes-prompt"}>You have no archived
                            quizzes</h1></div>)
                    : showArchived && quizAnswers.length >= 1 ? (<div className={"quizcard-container"}>

                            {quizAnswers.map((item) => {
                                if (user.user.roles.includes("ROLE_ADMIN") || user.user.roles.includes("ROLE_TEACHER")) {
                                    console.log(item);
                                    let deployedQuiz = item;
                                    let quiz = JSON.parse(deployedQuiz.quiz)
                                    return <QuizCard quizLength={quiz.quizLength} title={quiz.title}
                                                     quizId={deployedQuiz.id}
                                                     progression={10} userNavigateTo={"quiz"}/>
                                } else {
                                    return <QuizCard title={item.title} quizId={item.id}
                                                     grading={item.grading + "/" + item.quizLength}
                                                     status={item.status} userNavigateTo={"feedback"}/>
                                }

                            })}
                        </div>) :
                        (<div className={"no-quiz-container"}><h1 className={"no-quizzes-prompt"}>You have no active
                            quizzes</h1></div>)}


        </div>
    )
}