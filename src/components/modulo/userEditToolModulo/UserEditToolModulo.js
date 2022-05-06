import React, {useEffect, useState} from 'react';
import './userEditToolModulo.css';
import {Button, TextField} from "@mui/material";
import axios from "axios";
import {useSelector} from "react-redux";
import Autocomplete from "@mui/material/Autocomplete";

/**
 * Modulo used to edit user details
 * @param editableUser user that is to be edited in the current modulo
 * @param setShowUserTool function used to show or hide the modulo
 * @param userUpdater function used to update users in the backend and frontend
 * @returns modulo for editing user details
 */
export default function UserEditToolModulo({editableUser, setShowUserTool, userUpdater}) {

    const isLogged = useSelector(state => state.isLoggedReducer);
    const [courses, setCourses] = useState([]);
    const [courseID, setCourseID] = useState("");

    /**
     * Gives the user the student role
     */
    function giveRoleStudent() {
        axios({
            method: "get",
            url: process.env.REACT_APP_URL + "/user/makestudent/" + editableUser.id,
            headers: {
                "Authorization": "Bearer " + isLogged.jwtToken
            }
        }).then((response) => {
            if (response.status === 200) {
                userUpdater();
                setShowUserTool(false);

            }
        });
    }

    /**
     * Gives the user the teacher role
     */
    function giveRoleTeacher() {
        axios({
            method: "get",
            url: process.env.REACT_APP_URL + "/user/maketeacher/" + editableUser.id,
            headers: {
                "Authorization": "Bearer " + isLogged.jwtToken
            }
        }).then((response) => {
            if (response.status === 200) {
                userUpdater();
                setShowUserTool(false);
            }
        });
    }

    /**
     * Gives the user the administrator role
     */
    function giveRoleAdministrator() {
        axios({
            method: "get",
            url: process.env.REACT_APP_URL + "/user/makeadmin/" + editableUser.id,
            headers: {
                "Authorization": "Bearer " + isLogged.jwtToken
            }
        }).then((response) => {
            if (response.status === 200) {
                userUpdater();
                setShowUserTool(false);
            }
        });
    }

    /**
     * Adds the user to the selected course
     */
    function addUserToCourse(){
        axios({
            method: "post",
            url: process.env.REACT_APP_URL + "/course/adduser/" +courseID,
            headers: {
                "Authorization": "Bearer " + isLogged.jwtToken
            },
            data:{
                userId:editableUser.id
            }

        }).then((response) => {
            if (response.status === 200) {
                userUpdater();
                setShowUserTool(false);
            }
        });
    }

    /**
     * Function used to close the modulo if a click outside is registered.
     * @param event click that sent the event
     */
    const handleClickOutside = (event) => {
        if (event.target.className === "edit-user-tool-wrapper") {
            setShowUserTool(false);
        }
    };

    /**
     * Gets all available courses and forms them into an array that can be used with the AutoComplete component from the MUI library
     */
    useEffect(() => {
        axios({
            method: "get",
            url: process.env.REACT_APP_URL + "/course/all",
            headers: {
                "Authorization": "Bearer " + isLogged.jwtToken
            }
        }).then(function (response) {
            setCourses(response.data.map((crs) => {
                let temp = JSON.parse(crs);
                return ({
                    label: temp.name,
                    id: temp.id
                })

            }))});

            //Adds eventlistener to the window to detect clicks that should close the modulo
            document.addEventListener('mousedown', handleClickOutside);
            return () => {
                document.removeEventListener('mousedown', handleClickOutside);
            };
        }, []);


        return (
            <div className={"user-edit-tool-modulo"}>
                <div className={"user-edit-tool-info-wrapper"}>
                    <h2>User: {editableUser.username}</h2>
                    <h2>Name: {editableUser.lastName}, {editableUser.firstName}</h2>
                </div>
                <div className={"add-user-to-course-tool"}>
                    <Autocomplete
                        size={"small"}
                        label={"Course"} className={"add-user-to-course-field"}
                        options={courses}
                        value={courses.id}
                        onChange={(elem, newValue) => {
                            if (newValue) {
                                setCourseID(newValue.id);
                            }
                            else {
                                setCourseID("");
                            }
                        }}
                        renderInput={(params) => <TextField {...params} label="Course"/>}/>
                    <Button onClick={addUserToCourse} className={"add-user-to-course-button"} sx={{fontSize: 10}} variant={"contained"}>Add user
                        to course</Button>

                </div>
                <div className={"user-edit-tool-button-wrapper"}>
                    <Button className={"user-admin-tool-action-button"} onClick={giveRoleStudent} sx={{fontSize: 10}}
                            variant={"contained"}>Give role student</Button>
                    <Button className={"user-admin-tool-action-button"} onClick={giveRoleTeacher} sx={{fontSize: 10}}
                            variant={"contained"}>Give role teacher</Button>
                    <Button className={"user-admin-tool-action-button"} onClick={giveRoleAdministrator}
                            sx={{fontSize: 10}} variant={"contained"}>Give role administrator</Button>
                </div>

            </div>
        )
    }