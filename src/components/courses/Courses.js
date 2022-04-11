import React, {useEffect, useState} from 'react';
import './courses.css';
import axios from "axios";
import {useSelector} from "react-redux";
import Course from "../course/Course";

function Courses() {

    const [courses, setCourses] = useState([]);
    const [joinCode, setJoinCode] = useState("");
    const isLogged = useSelector(state => state.isLoggedReducer);
    const user = useSelector(state => state.userReducer.user);
    const roles = user.roles;


    useEffect(() => {
        axios({
            method: "get",
            url: "http://10.212.26.200:8080/user/courses",
            headers: {
                "Authorization": "Bearer " + isLogged.jwtToken
            }
        }).then(function (response) {
            setCourses(response.data);
        })
    }, []);

    function joinCourse(){
        axios({
            method:"get",
            url:"http://10.212.26.200:8080/user/joincourse/"+joinCode,
            headers: {
                "Authorization": "Bearer " + isLogged.jwtToken
            }

        }).then(function(response){
            setCourses(response.data);
        });
    }


    return (<div className={"courses"}>
        <div className={"course-title-wrapper"}><h1 className={"course-title"}>Your courses</h1> {roles.includes('ROLE_STUDENT' || roles.includes('ROLE_TEACHER')) ? <div className={"join-course-wrapper"}><input type={"text"} placeholder={"Course join code"} onChange={(elem)=>setJoinCode(elem.target.value)}
        /><button onClick={joinCourse}>Join course</button></div> : null}</div>

        {
            (courses.length >= 1) ? (
                <div className={"course-list"}>
                    {courses.map((course)=> {
                        course = JSON.parse(course);
                        return (<Course id={course.id} name={course.name} description={course.description} activeQuizAmnt={course.activeQuizAmnt} joinCode={course.joinCode}/>)
                    })}
                </div>
            ) : (
                <div className={"no-courses-wrapper"}>
                    <h1>You have no courses</h1>
                </div>
            )
        }
    </div>);
}

export default Courses;