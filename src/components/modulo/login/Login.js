import React from "react";
import './login.css';
import {useDispatch, useSelector} from "react-redux";
import {setUser} from "../../../store/action/userAction";
import {setLoginStatus} from "../../../store/action/isLoggedAction";
import {useNavigate,useLocation} from "react-router-dom";

export default function Login() {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [loginType, setLoginType] = React.useState("");
    const [email,setEmail] = React.useState("");
    const [code,setCode] = React.useState("");

    const isLogged = useSelector(state => state.isLoggedReducer);
    const user = useSelector(state => state.userReducer);


    function submitLogin(){
        let logginApproved = true;
        if(logginApproved) {
            dispatch(setUser({
                email:email,
            code: code}))
            dispatch(setLoginStatus({
                isLogged: true,
                sessionToken: ""}))
            navigate("/");

        }
    }

    return (
        <div>
            {loginType === "" ? (
                <div className="login-modulo">
                    <div className="login-wrapper">
                        <div className="feide-login">
                            <img srcSet="https://min.kunnskap.no/media/img/vertikal_feide4x.png" alt="Feide"/>
                            <h1>Feide</h1>
                            <div className="arrow-wrapper"><h1 className="login-arrow">></h1></div>
                        </div>
                    </div>
                    <div className="login-wrapper" onClick={() => {
                        setLoginType("guest")
                    }}>
                        <div className="feide-login">
                            <h1>Guest</h1>
                            <div className="arrow-wrapper"><h1 className="login-arrow">></h1></div>
                        </div>
                    </div>
                </div>
            ) : (loginType === "guest") ? (
                <div className="guest-login">
                    <div className="guest-login-fields">
                        <label>Email:</label>
                        <input type={"text"} onChange={(elem)=>setEmail(elem.target.value)}/>
                        <label>Code:</label>
                        <input type={"text"} onChange={(elem)=>setCode(elem.target.value)}/>
                    </div>
                    <input type={"button"} className={"login-submit-btn"} value={"Login"} onClick={submitLogin}/>
                </div>
            ) : null}
        </div>
    )
}