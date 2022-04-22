import React, {useEffect, useState} from 'react';
import './userTools.css';
import {useSelector} from "react-redux";
import axios from "axios";
import UserEditToolModulo from "../modulo/userEditToolModulo/UserEditToolModulo";
export default function UserTools(){
    const url = "http://localhost:8080";
    const isLogged = useSelector(state => state.isLoggedReducer);
    const [users,setUsers] = useState([]);
    const [editableUser,setEditableUser] = useState({});
    const [showUserTools,setShowUserTools] = useState(false);

    useEffect(()=>{
        updateUsers();
    },[])

    function updateUsers(){
        axios({
            method:"get",
            url:url+"/user/all",
            headers:{
                "Authorization":"Bearer "+isLogged.jwtToken
            }
        }).then((response)=>{
            if(response.status === 200){
                let temp =response.data;
                temp = temp.map((user)=>JSON.parse(user))
                setUsers(temp);
            }
        });
    }

    function showUserOptions(user){
        setShowUserTools(true);
        setEditableUser(user);
    }

    return(
        <div className={"user-tools-wrapper"}>
            {showUserTools ? (<div className={"edit-user-tool-wrapper"}>
                <UserEditToolModulo editableUser={editableUser} setShowUserTool={setShowUserTools} userUpdater={updateUsers}/>
            </div>):null}
            <table className={"user-table"}>
                <tr>
                    <th>User ID</th>
                    <th>Username</th>
                    <th>First name</th>
                    <th>Last name</th>
                    <th>Email</th>
                    <th>Roles</th>
                </tr>
                {
                    users.map((user)=>{
                        return(
                            <tr onClick={()=>showUserOptions(user)}>
                                <td>{user.id}</td>
                                <td>{user.username}</td>
                                <td>{user.firstName}</td>
                                <td>{user.lastName}</td>
                                <td>{user.email}</td>
                                <td>{user.roles.map((role)=>role+"\n")}</td>
                            </tr>
                        )
                    })
                }
            </table>
        </div>
    )
}