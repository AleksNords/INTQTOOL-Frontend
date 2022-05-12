import React, {useEffect, useState} from 'react';
import './courses.css';
import axios from "axios";
import {useSelector} from "react-redux";
import Course from "../../components/course/Course";
import {TextField} from "@mui/material";
import Button from "@mui/material/Button";

/**
 * Page displaying all the courses that the user is a part of
 * @returns page with all the users courses
 */
function Courses() {

    const [courses, setCourses] = useState([]);
    const [joinCode, setJoinCode] = useState("");
    const isLogged = useSelector(state => state.isLoggedReducer);
    const user = useSelector(state => state.userReducer.user);
    const roles = user.roles;

    /**
     * Fetches the courses the user is a part of
     */
    useEffect(() => {
        axios({
            method: "get",
            url: process.env.REACT_APP_URL + "/user/courses",
            headers: {
                "Authorization": "Bearer " + isLogged.jwtToken
            }
        }).then(function (response) {
            setCourses(response.data);
        })
    }, []);

    /**
     * Joins a course based on the provided join code
     */
    function joinCourse() {
        axios({
            method: "get",
            url: process.env.REACT_APP_URL + "/user/joincourse/" + joinCode,
            headers: {
                "Authorization": "Bearer " + isLogged.jwtToken
            }

        }).then(function (response) {
            setCourses(response.data);
        });
    }


    return (<div className={"courses"}>
        <div className={"course-title-wrapper"}><h1 className={"course-title"}>Your courses</h1>
            <div className={"join-course-wrapper"}><TextField className="join-code-textfield"
                                                              InputLabelProps={{style: {fontSize: 14}}}
                                                              InputProps={{style: {fontSize: 14}}} type={"text"}
                                                              label={"Course join code"}
                                                              onChange={(elem) => setJoinCode(elem.target.value)}
            /><Button className="join-course-button" variant="contained" onClick={joinCourse}>Join course</Button></div>
        </div>

        {
            (courses.length >= 1) ? (
                <div className={"course-list"}>
                    {courses.map((course) => {
                        course = JSON.parse(course);
                        return (<Course id={course.id} name={course.name} description={course.description}
                                        activeQuizAmnt={course.activeQuizAmnt} joinCode={course.joinCode}/>)
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