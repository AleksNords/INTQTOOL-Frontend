import './App.css';
import React, {useEffect} from 'react';
import Navbar from "./components/navbar/Navbar";
import Login from "./components/modulo/login/Login";
import {Route,Routes} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import Home from "./components/home/Home";
import SignUp from "./components/modulo/signup/SignUp";
import Quiz from "./components/quiz/Quiz";
import Courses from "./components/courses/Courses";
import Notifications from "./components/notifications/Notifications";
import NewQuiz from "./components/newQuiz/NewQuiz";
import AdminTools from "./components/adminTools/AdminTools";
import GradingQuiz from "./components/gradingQuiz/GradingQuiz";
import QuizFeedback from "./components/quizFeedback/QuizFeedback";

function App() {
    const isLogged = useSelector(state => state.isLoggedReducer);

    return (
        <div className="App">
            <Navbar/>

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

        </div>
    );
}

export default App;
