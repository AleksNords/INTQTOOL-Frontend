import React from "react";
import './navbar.css';
import {useDispatch, useSelector} from "react-redux";
import {setUser, signOut} from "../../store/action/userAction";
import {setLoginStatus} from "../../store/action/isLoggedAction";
import {useNavigate} from "react-router-dom";
import HomeIcon from '@mui/icons-material/Home';
import CreateIcon from '@mui/icons-material/Create';
import SettingsIcon from '@mui/icons-material/Settings';
import NotificationsIcon from '@mui/icons-material/Notifications';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import Divider from '@mui/material/Divider';
import axios from "axios";
import {ThemeProvider} from '@mui/system';

export default function Navbar() {
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const isLogged = useSelector(state => state.isLoggedReducer);
    const user = useSelector(state => state.userReducer);

    function logout() {
        axios("http://localhost:8080/logout", {
            method: 'get',
            withCredentials: true
        }).then((response) => {
            if (response.status === 200) {
                dispatch(setUser({}))
                dispatch(setLoginStatus({
                    isLogged: false,
                    sessionToken: ""
                }))
                navigate("/");

            }
        }).catch((response) => {
            dispatch(setLoginStatus({
                isLogged: false,
                sessionToken: ""
            }))
        })

    }

    return (
        <div className="navbar">
            {isLogged.isLogged === true ? (<ThemeProvider>
                <div className="navLinks">
                    <span><HomeIcon sx={{fontSize: 40}}/>Home</span>
                    <Divider orientation="vertical" flexItem className={"vertical-divider"}/>
                    <span><CreateIcon sx={{fontSize: 40}}/>My Courses</span>
                    <Divider orientation="vertical" flexItem className={"vertical-divider"}/>
                    <span><SettingsIcon sx={{fontSize: 40}}/>Settings</span>
                </div>
                <div className="personalLinks">
                    <NotificationsIcon sx={{fontSize: 40,}}/>
                    <span>Aleks</span>
                    <AccountCircleIcon sx={{fontSize: 40}} onClick={logout}/>
                </div>
            </ThemeProvider>) : <img className="ntnu-logo" src="https://ec2euc1.boxcloud.com/api/2.0/internal_files/560202098537/versions/593851764137/representations/png_paged_2048x2048/content/1.png?access_token=1!Cov-8X-1AcHQZ8y5CTPD_UUvP1zSIdDIHp5xmv3q-hju-DXL3Sw5ffML6k894_I_IYsMdHwSJfxaIdIjpURv5nm26IIqDP-bwAJekN6eO9cn2uLtRglHUFcTjRA23iP4pYQtYZEqEeMs3R8aqdJHXoJ_MT910QhdkveTVL_gzD9ihfPF6jlTDXGbvc0By9Imt9kNwdOBvUKCDKleb_yPw-izfGhNqBN8qhGr7t8I7dg0VaeR426MeMTxedrsdNojhbONb9E5OEVugxKT0TRrTtb56TMwpz8SIaYMxzr_1pNJ7SWXUPuJUYfxXuDzz_XsQ-kJZau0NSe1_fZcCxdp7ey4B1bxrAtOdV6dy-0s5G4YhX4bWpt4v7g6XQG7VdlK09dSYBC2VufmjqwzRcNaJvDzhgKvpowNzVdLshykZYVACnoKyU-163HqjqbdNEZDY6H8ptLR4etqtdFjMdwpFF_rw7Qn5xxG-669zThmCPSMH_iot_NsHyJr9WFNgOxtcakfaeYW1I9O8R3jPBzM5AsAaSIbqJnrQjTb1uFhJpkyx6vs29M3eZR_UACaD_vZnw..&shared_link=https%3A%2F%2Fntnu.app.box.com%2Fv%2Flogoer-ntnu-diverse&box_client_name=box-content-preview&box_client_version=2.83.0"/>}
        </div>
    )
}