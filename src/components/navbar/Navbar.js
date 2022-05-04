import React from "react";
import './navbar.css';
import {useDispatch, useSelector} from "react-redux";
import {removeUser} from "../../store/action/userAction";
import {setLoginStatus} from "../../store/action/isLoggedAction";
import {useNavigate} from "react-router";
import HomeIcon from '@mui/icons-material/Home';
import CreateIcon from '@mui/icons-material/Create';
import SettingsIcon from '@mui/icons-material/Settings';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import Divider from '@mui/material/Divider';
import NotificationBell from './notificationBell/NotificationBell';
import AdminPanelSettingsIcon from '@mui/icons-material/AdminPanelSettings';

export default function Navbar() {
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const isLogged = useSelector(state => state.isLoggedReducer);
    const user = useSelector(state => state.userReducer);

    function logout() {
        dispatch(setLoginStatus({
            isLogged: false,
            jwtToken: ""
        }))
        dispatch(removeUser())
        navigate("/");
    }

    return (
        <div className="navbar">
            {isLogged.isLogged === true ? (<>
                <div className="navLinks">
                    <span onClick={()=>navigate("/")}><HomeIcon sx={{fontSize: 40}}/>Home</span>
                    <Divider sx={{backgroundColor: "#ffffff"}} orientation="vertical" flexItem className={"vertical-divider"}/>
                    <span onClick={()=>navigate("/mycourses")}><CreateIcon sx={{fontSize: 40}} />My Courses</span>
                    <Divider sx={{backgroundColor: "#ffffff"}} orientation="vertical" flexItem className={"vertical-divider"}/>
                    <span><SettingsIcon sx={{fontSize: 40}}/>Settings</span>
                    {
                        (user.user.roles && user.user.roles.includes("ROLE_ADMIN")) ?
                            (
                                <Divider color="divider.white" orientation="vertical" flexItem className={"vertical-divider"}/>
                            )
                            :
                            null
                    }
                    {
                        (user.user.roles && user.user.roles.includes("ROLE_ADMIN")) ?
                            (
                                <span onClick={()=>navigate("/admintools")}><AdminPanelSettingsIcon sx={{fontSize: 40}}/>Admin tools</span>
                            )
                            :
                            null
                    }
                </div>
                <div className="personalLinks">
                    <div><NotificationBell/></div>
                    <span>{user.user.firstName}</span>
                    <AccountCircleIcon sx={{fontSize: 45}} onClick={logout}/>
                </div></>) : <img className="ntnu-logo" alt={"NTNU logo"} src="./ntnu_logo_hvit.png" onClick={()=>{navigate("/");}}/>}
        </div>
    )
}