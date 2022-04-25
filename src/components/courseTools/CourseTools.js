import './courseTools.css';
import React, {useEffect, useState} from 'react';
import {useSelector} from "react-redux";
import axios from "axios";
import {TextField} from "@mui/material";
import Button from "@mui/material/Button";
import NewCourseModulo from "../modulo/newCourseModulo/NewCourseModulo";

export default function CourseTools(){
    const url = "https://quiz.web-tek.ninja:8443";
    const isLogged = useSelector(state => state.isLoggedReducer);
    const [courses, setCourses] = useState([]);
    const [filteredCourses, setFilteredCourses] = useState([]);
    const [searchWord, setSearchWord] = useState("");
    const [showNewCourseModulo,setShowNewCourseModulo] = useState(false)

    useEffect(() => {
        updateCourses();
    }, [])

    function updateCourses() {
        axios({
            method: "get",
            url: url + "/course/all",
            headers: {
                "Authorization": "Bearer " + isLogged.jwtToken
            }
        }).then((response) => {
            if (response.status === 200) {
                let temp = response.data;
                temp = temp.map((course) => JSON.parse(course))
                console.log(temp);
                setCourses(temp);
                setFilteredCourses(temp)
            }
        });
    }

    function searchCourse(){

    }

    function submitNewCourse(newCourse){
        axios({
            method: "post",
            url: url + "/course/new",
            headers: {
                "Authorization": "Bearer " + isLogged.jwtToken
            },
            data:newCourse
        }).then((response) => {
            if (response.status === 200) {
                let temp = response.data;
                temp = temp.map((course) => JSON.parse(course))
                console.log(temp);
                setCourses(temp);
                setFilteredCourses(temp)
            }
        });
    }


    return(
        <div className={"course-tools-wrapper"}>
            <div className={"course-tools-search-bar"}>
                <TextField size={"small"}
                           defaultValue={searchWord}
                           onChange={(elem) => setSearchWord(elem.target.value)}
                           label={(filteredCourses.length === 0) ?"No result":"Search"} className={"course-tools-search-field"}
                           InputLabelProps={{style: {fontSize: 11, color: "black"}}}
                           InputProps={{style: {fontSize: 11}}}/>
                <Button onClick={searchCourse}
                        variant={"contained"}
                        sx={{fontSize: 10}}
                        className={"course-tool-search-button"}>Search</Button>
            </div>
            {showNewCourseModulo ? (<div className={"edit-course-tool-wrapper"}>
                <NewCourseModulo submitNewCourse={submitNewCourse} setShowNewCourseModulo={setShowNewCourseModulo}/>
            </div>) : null}
            <table className={"course-table"}>
                <tr>
                    <th>Course ID</th>
                    <th>Course name</th>
                    <th>Description</th>
                    <th>Amount of active quizzes</th>
                    <th>Join code</th>
                </tr>
                {
                    filteredCourses.map((course) => {
                        return (
                            <tr>
                                <td>{course.id}</td>
                                <td>{course.name}</td>
                                <td>{course.description}</td>
                                <td>{course.activeQuizAmnt}</td>
                                <td>{course.joinCode}</td>
                            </tr>
                        )
                    })
                }
            </table>
            <Button onClick={()=>setShowNewCourseModulo(true)} className={"add-course-button"} variant={"contained"}>Add course</Button>
        </div>
    )
}