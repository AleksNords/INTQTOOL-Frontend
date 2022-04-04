import React, {useEffect, useState} from 'react';
import "./quiz.css";
import {useParams} from "react-router";
import axios from "axios";
import {useSelector} from "react-redux";

function Quiz() {
    let {id} = useParams();

    const isLogged = useSelector(state => state.isLoggedReducer);
    const [quiz, setQuiz] = useState({});

    useEffect(() => {
        axios({
            method: "get",
            url: "http://localhost:8080/quiz/" + id,
            headers: {
                "Authorization": "Bearer " + isLogged.jwtToken
            }
        }).then(function (response) {
                setQuiz(response.data);
            }
        );
    }, []);

    return (

        <div>
            {(quiz.title !== null) || (quiz.title !== undefined) ?
                (<div>

                </div>) :
                (<div>

                </div>)
            }
        </div>

    );

}

export default Quiz;