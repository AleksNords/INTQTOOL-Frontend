import './courseTools.css';
import React, {useEffect, useState} from 'react';
import {useSelector} from "react-redux";
import axios from "axios";
import {TextField} from "@mui/material";
import Button from "@mui/material/Button";
import NewCourseModulo from "../modulo/newCourseModulo/NewCourseModulo";

/**
 * View of all courses, with a search bar and option to add a new course.
 * @returns element displaying all courses, along with tools to manipulate them
 */
export default function CourseTools(){
    const isLogged = useSelector(state => state.isLoggedReducer);
    const [courses, setCourses] = useState([]);
    const [filteredCourses, setFilteredCourses] = useState([]);
    const [searchWord, setSearchWord] = useState("");
    const [showNewCourseModulo,setShowNewCourseModulo] = useState(false)

    useEffect(() => {
        updateCourses();
    }, [])

    /**
     * Updates the displayed courses by fetching the data from the API and setting the received data into state variables.
     */
    function updateCourses() {
        axios({
            method: "get",
            url: process.env.REACT_APP_URL + "/course/all",
            headers: {
                "Authorization": "Bearer " + isLogged.jwtToken
            }
        }).then((response) => {
            if (response.status === 200) {
                let temp = response.data;
                temp = temp.map((course) => JSON.parse(course))
                setCourses(temp);
                setFilteredCourses(temp)
            }
        });
    }

    /**
     * Searches for courses with the searchWord state variable
     */
    function searchCourse(){
        let temp = courses;
        if (searchWord.length >= 1) {
            temp = temp.filter((course) =>
                course.title.includes(searchWord))
            setFilteredCourses(temp);
        } else {
            setFilteredCourses(courses);
        }
    }

    /**
     * Creates a new course by sending it to the backend
     * @param newCourse object representing the new course
     */
    function submitNewCourse(newCourse){
        axios({
            method: "post",
            url: process.env.REACT_APP_URL + "/course/new",
            headers: {
                "Authorization": "Bearer " + isLogged.jwtToken
            },
            data:newCourse
        }).then((response) => {
            if (response.status === 200) {
                let temp = response.data;
                temp = temp.map((course) => JSON.parse(course))
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
                           InputProps={{style: {fontSize: 11}}}
                           onKeyUp={(event)=>{
                               if(event.key === "Enter"){
                                   searchCourse();
                               }
                           }}
                />
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