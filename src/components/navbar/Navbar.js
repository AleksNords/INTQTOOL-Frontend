import React from "react";
import './navbar.css';
import {useDispatch, useSelector} from "react-redux";
import {setUser, signOut} from "../../store/action/userAction";
import {setLoginStatus} from "../../store/action/isLoggedAction";
import {useNavigate} from "react-router-dom";

export default function Navbar(){
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const isLogged = useSelector(state => state.isLoggedReducer);
    const user = useSelector(state => state.userReducer);

    function logout(){
        let logginApproved = true;
        if(logginApproved) {
            dispatch(setUser({}))
            dispatch(setLoginStatus({
                isLogged: false,
                sessionToken: ""}))
            navigate("/");

        }
    }
    return(
        <div className="navbar">
            <h3 onClick={logout}>Log out</h3>
        </div>
    )
}