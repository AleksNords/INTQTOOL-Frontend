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


    function submitLogin() {
        var details = {
            'username': username,
            'password': password
        };

        let formBody = [];
        for (let property in details) {
            let encodedKey = encodeURIComponent(property);
            let encodedValue = encodeURIComponent(details[property]);
            formBody.push(encodedKey + "=" + encodedValue);
        }
        formBody = formBody.join("&");
        axios({
            method:'post',
            url:"http://localhost:8080/login",
            maxRedirects:0,
            headers:{"Authorization":"none",
            "Accept":"*/*",
            "Content-Type":"application/x-www-form-urlencoded"},
            data:formBody

        }).then(function(response){
            console.log(response);
            console.log(response.status);
            if(response.status === 200){
                dispatch(setLoginStatus({
                    isLogged: true,
                    sessionToken: document.cookie
                }))
                navigate("/");
            }
        }).catch(function(response){
            console.log(response.statusCode);
            console.log(response);
        });
    }

    return (

        <div className="login-wrapper">
            <div className={"login-fields"}>
                <label>Username</label>
                <input type={"text"} className={"login-form-field"} onChange={elem=>setUsername(elem.target.value)}/>
                <label>Password</label>
                <input type={"password"} className={"login-form-field"} onChange={elem=>setPassword(elem.target.value)}/>
            </div>
            <div className={"login-submit-wrapper"}>
                <input type={"button"} value={"Login"} className={"login-form-submitButton"} onClick={submitLogin}/>
                <p>Dont have an account? <a>Sign up here!</a></p>
            </div>

        </div>
    )
}