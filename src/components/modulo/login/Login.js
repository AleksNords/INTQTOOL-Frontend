import React, {useEffect} from "react";
import './login.css';
import {useDispatch} from "react-redux";
import {setUser} from "../../../store/action/userAction";
import {setLoginStatus} from "../../../store/action/isLoggedAction";
import {useNavigate} from "react-router";
import axios from "axios";
import {TextField} from "@mui/material";
import Button from "@mui/material/Button";

export default function Login() {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [username, setUsername] = React.useState("");
    const [password, setPassword] = React.useState("");
    const url = "https://quiz.web-tek.ninja:8443";


    function submitLogin() {
        // TODO - no logging of passwords in the console! :)
        console.log(password);
        let details = {
            'username': username,
            'password': password
        };

        axios({
            method: 'post',
            url: url + "/authenticate",
            headers: {
                // TODO - the Access headers don't make sense in requests, these should be send by the backend, not frontend
                "Accept": "*/*",
                "Access-Control-Allow-Origin": "*",
                'Access-Control-Allow-Credentials': true,
                "Access-Control-Allow-headers": "*",
                "Content-Type": "application/json"
            },
            data: details

        }).then(function (response) {

            if (response.status === 200) {
                dispatch(setLoginStatus({
                    isLogged: true,
                    jwtToken: response.data.jwt
                }))
                getUserInfo(response.data.jwt);
                navigate("/");
            }
        }).catch(function (error) {
            if (error.response.status === 401) {
                displayErrorPrompt();
            }

        });
    }

    function getUserInfo(token) {
        axios({
            method: "get",
            url: url + "/user/myuser",
            headers: {
                "Authorization": "Bearer " + token
            }
        })
            .then(function (response) {
                if (response.status === 200) {
                    dispatch(setUser({
                        user: response.data
                    }))
                }
            });
    }

    function displayErrorPrompt() {
        let errorPrompt = document.getElementById("login-error-prompt");
        errorPrompt.style.display = "flex";
    }

    function goToSignUp() {
        navigate("/signup");
    }

    return (
        // TODO - is there a reason why the class name is enclosed in {}? The same for IDs
        <div className={"position-wrapper"}>
            <div className="login-wrapper">

                <div className={"login-fields"}>
                    <div id={"login-error-prompt"} className={"login-error-prompt"}>
                        <p>Wrong username or password</p>
                    </div>
                    <TextField label={"Username"} type={"text"} size={"small"} className={"login-form-field"}
                               onChange={elem => setUsername(elem.target.value)}
                               InputLabelProps={{style: {fontSize: 15, color: "black"}}}
                               InputProps={{style: {fontSize: 15}}}
                               onKeyUp={(event)=>{
                                   if(event.key === "Enter"){
                                       submitLogin();
                                   }
                               }}/>
                    <TextField size={"small"} label={"Password"} id="login-password-input" name={"login-password-input"}
                               type={"password"} className={"login-form-field"}
                               onChange={elem => setPassword(elem.target.value)}
                               InputLabelProps={{style: {fontSize: 15, color: "black"}}}
                               InputProps={{style: {fontSize: 15}}}
                               onKeyUp={(event)=>{
                                   if(event.key === "Enter"){
                                       submitLogin();
                                   }
                               }}
                    />
                </div>
                <div className={"login-submit-wrapper"}>
                    <Button sx={{fontSize: 15}} variant={"contained"} className={"login-form-submitButton"} onClick={submitLogin}>Login</Button>
                    <p className={"sign-up-paragraph"}>Dont have an account? <a onClick={goToSignUp} className={"sign-up-link"}>Sign up here!</a></p>
                </div>

            </div>
        </div>
    )
}
