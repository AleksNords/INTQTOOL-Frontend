import React from "react";
import './navbar.css';
import {useDispatch, useSelector} from "react-redux";
import {removeUser} from "../../store/action/userAction";
import {setLoginStatus} from "../../store/action/isLoggedAction";
import {useNavigate} from "react-router";
import HomeIcon from '@mui/icons-material/Home';
import CreateIcon from '@mui/icons-material/Create';
import SettingsIcon from '@mui/icons-material/Settings';
import NotificationsIcon from '@mui/icons-material/Notifications';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import Divider from '@mui/material/Divider';
import {ThemeProvider} from '@mui/system';

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
            {isLogged.isLogged === true ? (<ThemeProvider>
                <div className="navLinks">
                    <span onClick={()=>navigate("/")}><HomeIcon sx={{fontSize: 40}} onClick={()=>navigate("/")}/>Home</span>
                    <Divider orientation="vertical" flexItem className={"vertical-divider"}/>
                    <span onClick={()=>navigate("/mycourses")}><CreateIcon sx={{fontSize: 40}} />My Courses</span>
                    <Divider orientation="vertical" flexItem className={"vertical-divider"}/>
                    <span><SettingsIcon sx={{fontSize: 40}}/>Settings</span>
                </div>
                <div className="personalLinks">
                    <NotificationsIcon sx={{fontSize: 40,}}/>
                    <span>{user.user.firstName}</span>
                    <AccountCircleIcon sx={{fontSize: 40}} onClick={logout}/>
                </div>
            </ThemeProvider>) : <img className="ntnu-logo" alt={"NTNU logo"} src="./ntnu_logo_hvit.png" onClick={()=>{navigate("/");}}/>}
        </div>
    )
}