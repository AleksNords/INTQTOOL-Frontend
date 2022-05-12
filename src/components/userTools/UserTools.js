import React, {useEffect, useState} from 'react';
import './userTools.css';
import {useSelector} from "react-redux";
import axios from "axios";
import UserEditToolModulo from "../modulo/userEditToolModulo/UserEditToolModulo";
import {TextField} from "@mui/material";
import Button from "@mui/material/Button";

/**
 * Page used to display and perform actions on the existing users
 * @returns page of users and tools to perform actions on them
 */
export default function UserTools() {
    const isLogged = useSelector(state => state.isLoggedReducer);
    const [users, setUsers] = useState([]);
    const [filteredUsers, setFilteredUsers] = useState([]);
    const [editableUser, setEditableUser] = useState({});
    const [searchWord, setSearchWord] = useState("");
    const [showUserTools, setShowUserTools] = useState(false);

    useEffect(() => {
        updateUsers();
    }, [])

    /**
     * Updates the users in the list
     */
    function updateUsers() {
        axios({
            method: "get",
            url: process.env.REACT_APP_URL + "/user/all",
            headers: {
                "Authorization": "Bearer " + isLogged.jwtToken
            }
        }).then((response) => {
            if (response.status === 200) {
                let temp = response.data;
                temp = temp.map((user) => JSON.parse(user))

                setUsers(temp);
                setFilteredUsers(temp);
            }
        });
    }

    /**
     * Shows the user tool modal
     * @param user that is to be edites
     */
    function showUserOptions(user) {
        setShowUserTools(true);
        setEditableUser(user);
    }

    /**
     * Searches through all users
     */
    function searchUsers() {
        let temp = users;
        if (searchWord.length >= 1) {
            temp = temp.filter((user) =>
                user.username.toLowerCase().includes(searchWord.toLowerCase()) ||
                user.firstName.toLowerCase().includes(searchWord.toLowerCase()) ||
                user.lastName.toLowerCase().includes(searchWord.toLowerCase()) ||
                user.email.toLowerCase().includes(searchWord.toLowerCase()) ||
                user.roles[0].includes(searchWord))
            setFilteredUsers(temp);
        } else {
            setFilteredUsers(users);
        }

    }

    return (
        <div className={"user-tools-wrapper"}>
            <div className={"user-tools-search-bar"}>
                <TextField size={"small"}
                           defaultValue={searchWord}
                           onChange={(elem) => setSearchWord(elem.target.value)}
                           label={(filteredUsers.length === 0) ? "No result" : "Search"}
                           className={"user-tools-search-field"}
                           InputLabelProps={{style: {fontSize: 11, color: "black"}}}
                           InputProps={{style: {fontSize: 11}}}
                           onKeyUp={(event) => {
                               if (event.key === "Enter") {
                                   searchUsers();
                               }
                           }}
                />
                <Button onClick={searchUsers}
                        variant={"contained"}
                        sx={{fontSize: 10}}
                        className={"user-tool-search-button"}>Search</Button>
            </div>
            {showUserTools ? (<div className={"edit-user-tool-wrapper"}>
                <UserEditToolModulo editableUser={editableUser} setShowUserTool={setShowUserTools}
                                    userUpdater={updateUsers}/>
            </div>) : null}
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
                    filteredUsers.map((user) => {
                        return (
                            <tr onClick={() => showUserOptions(user)}>
                                <td>{user.id}</td>
                                <td>{user.username}</td>
                                <td>{user.firstName}</td>
                                <td>{user.lastName}</td>
                                <td>{user.email}</td>
                                <td>{user.roles.map((role) => role + "\n")}</td>
                            </tr>
                        )
                    })
                }
            </table>
        </div>
    )
}