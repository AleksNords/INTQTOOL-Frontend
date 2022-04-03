import React from "react";
import './login.css';
import {useDispatch, useSelector} from "react-redux";
import {setUser} from "../../../store/action/userAction";
import {setLoginStatus} from "../../../store/action/isLoggedAction";
import {useNavigate, useLocation} from "react-router-dom";
import axios from "axios";

export default function Login() {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [username, setUsername] = React.useState("");
    const [password, setPassword] = React.useState("");

    const isLogged = useSelector(state => state.isLoggedReducer);
    const user = useSelector(state => state.userReducer);

    function getCookie(cookie) {
        let name = cookie + '=';
        let cookies = decodeURIComponent(document.cookie).split(";");
        for (let i = 0; i < cookies.length; i++) {
            let c = cookies[i];
            while (c.charAt(0) == ' ') {
                c = c.substring(1);
            }
            if (c.indexOf(name) == 0) {
                return c.substring(name.length, c.length)
            }
        }
        return "";
    }


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
            console.log(response);
            console.log(response.status);
            if (response.status === 200) {
                dispatch(setLoginStatus({
                    isLogged: true,
                    jwtToken: response.data.jwt
                }))
                getUserInfo(response.data.jwt);
                navigate("/");
            }
        }).catch(function (response) {
            console.log(response.statusCode);
            console.log(response);
        });
    }

    function getUserInfo(token){
        axios({
            method:"get",
            url:"http://localhost:8080/user/myuser",
            headers:{
                "Authorization": "Bearer "+token
            }
        })
            .then(function (response){
                if(response.status===200){
                    dispatch(setUser({
                        user:response.data
                    }))
                }
            });
    }

    function goToSignUp(){
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