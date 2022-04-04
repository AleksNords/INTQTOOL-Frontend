import React from 'react';
import './course.css';

function Course({id,name,description,activeQuizAmnt,joinCode}){

    return(<div className={"course-list-item-wrapper"}>
        <div className={"course-list-item-left-content"}><h2>{name}</h2> <p>{description}</p></div>
        <div className={"course-list-item-right-content"}><h3 className={"course-info"}>Active quizzes: {activeQuizAmnt}</h3> <h3 className={"course-info"}>JoinCode: {joinCode}</h3></div>
    </div>)
}

export default Course;