import './App.css';
import React, {useState} from 'react';
import Navbar from "./components/navbar/Navbar";
import Login from "./components/modulo/login/Login";
import {Route, Routes} from "react-router";
import {useSelector} from "react-redux";
import Home from "./pages/home/Home";
import SignUp from "./components/modulo/signup/SignUp";
import Quiz from "./pages/quiz/Quiz";
import Courses from "./pages/courses/Courses";
import Notifications from "./pages/notifications/Notifications";
import NewQuiz from "./pages/newQuiz/NewQuiz";
import AdminTools from "./pages/adminTools/AdminTools";
import GradingQuiz from "./pages/gradingQuiz/GradingQuiz";
import QuizFeedback from "./pages/quizFeedback/QuizFeedback";
import QuestionMarkRoundedIcon from '@mui/icons-material/QuestionMarkRounded';

import {Fab, Tooltip} from '@mui/material';
import UserGuideModulo from "./components/modulo/userGuideModulo/UserGuideModulo";

/**
 * The main app component that holds the routing used for the application as well as a navigation bar.
 * @returns main app component
 */

export default function App() {
    const isLogged = useSelector(state => state.isLoggedReducer);
    const [showUserGuide, setShowUserGuide] = useState(false);

    return (
        <div className="App">
            <Navbar/>
            {
                (showUserGuide === true) ?
                    <UserGuideModulo setShowModulo={setShowUserGuide}/>
                    :
                    null
            }
            <div className="center-content">
                {(isLogged.isLogged === false) ? (

                    <Routes>
                        <Route exact path={"/"} element={<Login/>}/>
                        <Route path={"/signup"} element={<SignUp/>}/>

                    </Routes>
                ) : (isLogged.isLogged === true) ? (
                    <Routes>
                        <Route exact path={"/"} element={<Home/>}/>
                        <Route path={"/quiz/:id"} element={<Quiz/>}/>
                        <Route path={"/mycourses"} element={<Courses/>}/>
                        <Route path={"/notifications"} element={<Notifications/>}/>
                        <Route path={"/quizeditor/:id"} element={<NewQuiz/>}/>
                        <Route path={"/admintools"} element={<AdminTools/>}/>
                        <Route path={"/quizgrader/:id"} element={<GradingQuiz/>}/>
                        <Route path={"/feedback/:id"} element={<QuizFeedback/>}/>
                    </Routes>

                ) : null}


            </div>
            <div className={"display-help-button"}><Tooltip
                title={<span className={"user-guide-tooltip"}>User-Guide</span>}><Fab
                aria-label={"User guide"}
                onClick={() => setShowUserGuide(!showUserGuide)} variant={"circular"} color={"primary"}
                size={"large"}><QuestionMarkRoundedIcon aria-label={"User guide"} sx={{color: "white", fontSize: "4rem"}}/></Fab></Tooltip></div>
        </div>
    );
}

