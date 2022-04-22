import React from 'react';
import './userEditToolModulo.css';
import {Button} from "@mui/material";
import axios from "axios";
import {useSelector} from "react-redux";

export default function UserEditToolModulo({editableUser,setShowUserTool,userUpdater}){
    const url = "http://localhost:8080";
    const isLogged = useSelector(state => state.isLoggedReducer);

    function giveRoleStudent(){
        axios({
            method:"get",
            url:url+"/user/makestudent/"+editableUser.id,
            headers:{
                "Authorization":"Bearer "+isLogged.jwtToken
            }
        }).then((response)=>{
            if(response.status===200){
                userUpdater();
                setShowUserTool(false);

            }
        });
    }

    function giveRoleTeacher(){
        axios({
            method:"get",
            url:url+"/user/maketeacher/"+editableUser.id,
            headers:{
                "Authorization":"Bearer "+isLogged.jwtToken
            }
        }).then((response)=>{
            if(response.status===200){
                userUpdater();
                setShowUserTool(false);
            }
        });
    }

    function giveRoleAdministrator(){
        axios({
            method:"get",
            url:url+"/user/makeadmin/"+editableUser.id,
            headers:{
                "Authorization":"Bearer "+isLogged.jwtToken
            }
        }).then((response)=>{
            if(response.status===200){
                userUpdater();
                setShowUserTool(false);
            }
        });
    }


    return(
        <div className={"user-edit-tool-modulo"}>
            <div className={"user-edit-tool-info-wrapper"}>
                <h2>User: {editableUser.username}</h2>
                <h2>Name: {editableUser.lastName}, {editableUser.firstName}</h2>
            </div>
            <div className={"user-edit-tool-button-wrapper"}>
                <Button onClick={giveRoleStudent} sx={{fontSize: 10}} variant={"contained"}>Give role student</Button>
                <Button onClick={giveRoleTeacher} sx={{fontSize: 10}} variant={"contained"}>Give role teacher</Button>
                <Button onClick={giveRoleAdministrator} sx={{fontSize: 10}} variant={"contained"}>Give role administrator</Button>
            </div>
        </div>
    )
}