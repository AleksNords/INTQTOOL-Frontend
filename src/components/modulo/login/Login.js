import React from "react";
import './login.css';
import {useDispatch} from "react-redux";
import {setUser} from "../../../store/action/userAction";
import {setLoginStatus} from "../../../store/action/isLoggedAction";
import {useNavigate} from "react-router";
import axios from "axios";

export default function Login() {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [username, setUsername] = React.useState("");
    const [password, setPassword] = React.useState("");


    function submitLogin() {
        var details = {
            'username': username,
            'password': password
        };

        axios({
            method: 'post',
            url: "http://localhost:8080/authenticate",
            headers: {
                "Accept": "*/*",
                "Access-Control-Allow-Origin": "*",
                'Access-Control-Allow-Credentials': true,
                "Access-Control-Allow-headers": "*",
                "Content-Type": "application/json"
            },
            withCredentials: true,
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
        }).catch(function (response) {
            console.log(response.status);
            console.log(response);
        });
    }

    function getUserInfo(token) {
        axios({
            method: "get",
            url: "http://localhost:8080/user/myuser",
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

    function goToSignUp() {
        navigate("/signup");
    }

    return (
        <div className={"position-wrapper"}>
            <div className="login-wrapper">
                <div className={"login-fields"}>
                    <label>Username</label>
                    <input type={"text"} className={"login-form-field"}
                           onChange={elem => setUsername(elem.target.value)}/>
                    <label>Password</label>
                    <input type={"password"} className={"login-form-field"}
                           onChange={elem => setPassword(elem.target.value)}/>
                </div>
                <div className={"login-submit-wrapper"}>
                    <input type={"button"} value={"Login"} className={"login-form-submitButton"} onClick={submitLogin}/>
                    <p>Dont have an account? <a onClick={goToSignUp} className={"sign-up-link"}>Sign up here!</a></p>
                </div>

            </div>
        </div>
    )
}