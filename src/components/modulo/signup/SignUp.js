import "./signup.css";
import React from 'react';
import axios from "axios";
import {Button, TextField} from "@mui/material";
import {useNavigate} from "react-router";

function SignUp() {

    const navigate = useNavigate();

    const [username,setUsername] = React.useState("");
    const [firstName,setFirstName] = React.useState("");
    const [lastName,setLastName] = React.useState("");
    const [email,setEmail] = React.useState("");
    const [emailConf,setEmailConf] = React.useState("");
    const [password,setPassword] = React.useState("");
    const [passwordConf,setPasswordConf] = React.useState("");
    const [warning,setWarning] = React.useState(false);
    const [warningText,setWarningText] = React.useState("");

    function submitAccount(){
        if(email === emailConf){
            if(password === passwordConf){
                setWarning(false);
                let newUser = {
                    "username":username,
                    "firstName": firstName,
                    "lastName": lastName,
                    "email":email,
                    "password": password,
                    "courses":[]
                }

                axios("http://localhost:8080/user/add",{
                    method: "post",
                    data:newUser
                }).then(function (response){
                    if(response.status === 200){
                        navigate("/");
                    }
                });
            } else{
                setWarningText("Passwords does not match");
                setWarning(true);
            }
        }
        else{
            setWarningText("Email does not match");
            setWarning(true);
        }
    }



    return (
        <div className={"position-wrapper"}>
            <div className={"sign-up-wrapper"}>
                <div className={"sign-up-position-wrapper"}>
                    <div className={"sign-up-form"}>

                        <div className={"sign-up-item"}>
                            <TextField
                                label={"Username"}
                                variant={"outlined"}
                                className={"sign-up-form-field"}
                                onChange={elem => setUsername(elem.target.value)}/>
                        </div>
                        {(warning === true) ? <div className={"sign-up-warning"}>

                            <p>Warning: {warningText}</p>
                        </div>: <div></div>}

                        <div className={"sign-up-item"}>
                            <TextField label={"First name"} className={"sign-up-form-field"}
                                   onChange={elem => setFirstName(elem.target.value)}/>
                        </div>

                        <div className={"sign-up-item"}>
                            <TextField label={"Last name"} className={"sign-up-form-field"}
                                   onChange={elem => setLastName(elem.target.value)}/>
                        </div>

                        <div className={"sign-up-item"}>
                            <TextField label={"E-mail"} className={"sign-up-form-field"}
                                   onChange={elem => setEmail(elem.target.value)}/>
                        </div>


                        <div className={"sign-up-item"}>
                            <TextField label={"Confirm e-mail"} className={"sign-up-form-field"}
                                   onChange={elem => setEmailConf(elem.target.value)}/>
                        </div>
                        <div className={"sign-up-item"}>
                            <TextField label={"Password"} type={"password"} className={"sign-up-form-field"}
                                   onChange={elem => setPassword(elem.target.value)}/>
                        </div>
                        <div className={"sign-up-item"}>
                            <TextField label={"Confirm password"} type={"password"} className={"sign-up-form-field"}
                            onChange={elem => setPasswordConf(elem.target.value)}/>
                        </div>



                    </div>
                </div>
                <div className={"sign-up-submit-wrapper"}>
                    <Button sx={{fontSize: 14}} variant="contained" className={"sign-up-form-submitButton"} onClick={submitAccount} >Create account</Button>
                </div>
            </div>


        </div>
    );
}

export default SignUp;