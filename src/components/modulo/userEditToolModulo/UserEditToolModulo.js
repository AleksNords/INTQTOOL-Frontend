import React, {useEffect, useState} from 'react';
import './userEditToolModulo.css';
import {Button, TextField} from "@mui/material";
import axios from "axios";
import {useSelector} from "react-redux";
import Autocomplete from "@mui/material/Autocomplete";

export default function UserEditToolModulo({editableUser, setShowUserTool, userUpdater}) {
    const url = "http://localhost:8080";
    const isLogged = useSelector(state => state.isLoggedReducer);
    const [courses, setCourses] = useState([]);
    const [courseID, setCourseID] = useState("");

    function giveRoleStudent() {
        axios({
            method: "get",
            url: url + "/user/makestudent/" + editableUser.id,
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

    function giveRoleTeacher() {
        axios({
            method: "get",
            url: url + "/user/maketeacher/" + editableUser.id,
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


    function giveRoleAdministrator() {
        axios({
            method: "get",
            url: url + "/user/makeadmin/" + editableUser.id,
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

    function addUserToCourse(){
        axios({
            method: "post",
            url: url + "/course/adduser/" +courseID,
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

    const handleClickOutside = (event) => {
        if (event.target.className === "edit-user-tool-wrapper") {
            setShowUserTool(false);
        }
    };

    useEffect(() => {
        axios({
            method: "get",
            url: url + "/course/all",
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
                    {/*<TextField size={"small"}
                               label={"Course"} className={"user-tools-search-field"}
                               InputLabelProps={{style: {fontSize: 11, color: "black"}}}
                               InputProps={{style: {fontSize: 11}}}/>*/}

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