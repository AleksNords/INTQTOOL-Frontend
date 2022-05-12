import "./signup.css";
import React from 'react';
import axios from "axios";
import {Button, TextField} from "@mui/material";
import {useNavigate} from "react-router";

/**
 * The sign up page for the application. Includes necessary user info fields
 * @returns sign up page
 */
function SignUp() {

    const navigate = useNavigate();

    const [username, setUsername] = React.useState("");
    const [firstName, setFirstName] = React.useState("");
    const [lastName, setLastName] = React.useState("");
    const [email, setEmail] = React.useState("");
    const [emailConf, setEmailConf] = React.useState("");
    const [password, setPassword] = React.useState("");
    const [warning, setWarning] = React.useState(false);
    const [warningText, setWarningText] = React.useState("");

    /**
     * Validates all provided fields and submits the user to the backend
     */
    function submitAccount() {
        if (username.length > 0) {
            if (email.length > 0) {
                if (validateEmail(email)) {
                    if (email === emailConf) {
                        if (firstName.length > 0) {
                            if (lastName.length > 0) {
                                if (checkPasswordFormat()) {
                                    setWarning(false);
                                    let newUser = {
                                        "username": username,
                                        "firstName": firstName,
                                        "lastName": lastName,
                                        "email": email,
                                        "password": password
                                    }

                                    axios(process.env.REACT_APP_URL + "/user/add", {
                                        method: "post",
                                        data: newUser
                                    }).then(function (response) {
                                        if (response.status === 201) {
                                            navigate("/");
                                        }

                                    }).catch(() => {
                                        //TODO: Handle error
                                    });
                                }
                            } else {
                                setWarningText("Last name is required");
                                setWarning(true);
                            }
                        } else {
                            setWarningText("First name is required");
                            setWarning(true);
                        }
                    } else {
                        setWarningText("Email does not match");
                        setWarning(true);
                    }
                } else {
                    setWarningText("Email is not right format");
                    setWarning(true);
                }
            } else {
                setWarningText("Email is required");
                setWarning(true);
            }

        } else {
            setWarningText("Username is required");
            setWarning(true);
        }
    }

    function validateEmail(emailStr) {
        return /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(emailStr);
    }

    /**
     * Validates the provided password
     * @returns {boolean} value used to determine password validity
     */
    function checkPasswordFormat() {
        let passwordIsValid = false;
        if (password.length < 8) {
            setWarningText("Password must contain at least 8 letters");
            setWarning(true);

        } else if (password.search(/[a-z]/) < 0) {
            setWarningText("Password must contain at one lowercase letter");
            setWarning(true);

        } else if (password.search(/[A-Z]/) < 0) {
            setWarningText("Password must contain at least 1 uppercase letter");
            setWarning(true);

        } else if (password.search(/[0-9]/) < 0) {
            setWarningText("Password must contain at one number");
            setWarning(true);

        } else {
            passwordIsValid = true;
        }

        return passwordIsValid;
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
                        </div> : <div/>}

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

                        <div className={"sign-up-submit-wrapper"}>
                            <Button sx={{fontSize: 14}} variant="contained" className={"sign-up-form-submitButton"}
                                    onClick={submitAccount}>Create account</Button>
                        </div>


                    </div>
                </div>
            </div>


        </div>
    );
}

export default SignUp;