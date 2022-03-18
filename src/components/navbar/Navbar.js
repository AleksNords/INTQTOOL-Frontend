import React from "react";
import './navbar.css';
import {useDispatch, useSelector} from "react-redux";
import {setUser, signOut} from "../../store/action/userAction";
import {setLoginStatus} from "../../store/action/isLoggedAction";
import {useNavigate} from "react-router-dom";
import axios from "axios";

export default function Navbar(){
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const isLogged = useSelector(state => state.isLoggedReducer);
    const user = useSelector(state => state.userReducer);

    function logout(){
        axios("http://localhost:8080/logout",{
            method:'get',
            withCredentials:true
        }).then((response)=>{
            if(response.status === 200) {
                dispatch(setUser({}))
                dispatch(setLoginStatus({
                    isLogged: false,
                    sessionToken: ""}))
                navigate("/");

            }
        }).catch((response)=>{
            dispatch(setLoginStatus({
                isLogged: false,
                sessionToken: ""}))
        })

    }
    return(
        <div className="navbar">
            <h3 onClick={logout}>Log out</h3>
        </div>
    )
}