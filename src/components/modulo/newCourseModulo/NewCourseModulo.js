import React, {useEffect, useState} from 'react';
import './newCourseModulo.css';
import {TextField} from "@mui/material";
import Button from "@mui/material/Button";

/**
 * Modulo used to create a new course
 * @param setShowNewCourseModulo state function used to show the modulo
 * @param submitNewCourse function used to send the course to the backennd
 * @returns modulo used to create a new course
 */
export default function NewCourseModulo({setShowNewCourseModulo,submitNewCourse}){

    const [newCourse, setNewCourse] = useState({
        name:"",
        description:""
    });

    /**
     * Function used to close the modulo if a click outside is registered.
     * @param event click that sent the event
     */
    const handleClickOutside = (event) => {
        if (event.target.className === "edit-course-tool-wrapper") {
            setShowNewCourseModulo(false);
        }
    };
    useEffect(()=>{
        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    })

    return(
        <div className={"new-course-modulo"}>
            <div className={"new-course-input-fields"}>
                <TextField size={"small"} label={"Name"}
                           InputLabelProps={{style: {fontSize: 11, color: "black"}}}
                           InputProps={{style: {fontSize: 11}}}
                           onChange={(elem)=>{
                               let temp = newCourse;
                               temp.name = elem.target.value;
                               setNewCourse(temp);
                           }}
                           inputProps={{
                               style: {
                                   width:"15rem"
                               }
                           }}
                           />
                <TextField label={"Description"}
                           multiline
                           inputProps={{
                               style: {
                                   height: "7rem",
                                   width:"20rem",
                               },
                           }}
                           onChange={(elem)=>{
                               let temp = newCourse;
                               temp.description = elem.target.value;
                               setNewCourse(temp);
                           }}
                           InputLabelProps={{style: {fontSize: 11, color: "black"}}}
                           InputProps={{style: {fontSize: 11}}}/>
            </div>
            <Button onClick={()=>{submitNewCourse(newCourse); setShowNewCourseModulo(false)}} variant={"contained"}>Create course</Button>
        </div>
    )
}