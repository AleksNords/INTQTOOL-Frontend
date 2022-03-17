import React from 'react';
import './home.css';
import axios from "axios";
import {setLoginStatus} from "../../store/action/isLoggedAction";
import {useDispatch, useSelector} from "react-redux";

export default function Home(){
    const dispatch = useDispatch();
    const isLogged = useSelector(state => state.isLoggedReducer);
    const [resData,setResData] = React.useState("");


    function requestUsers(){
        axios({
            method: 'get',
            url: "http://localhost:8080/user/all",
            withCredentials:true,
            headers: {
                "Accept": "*/*"
            }

        }).then(function (response) {
            console.log(response);
            console.log(response.status);
            if (response.status === 200) {
                setResData(response.data);
            }
        }).catch(function (response) {
            console.log(response.statusCode);
            console.log(response);
        });
    }
    return(
        <div className={"home"}>
            <h1>Hello</h1>
            <button onClick={requestUsers}>Get all users</button>
            <p>{resData}</p>
        </div>
    )
}