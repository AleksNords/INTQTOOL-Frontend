import React from 'react';
import './questionbanner.css';
import AddRoundedIcon from '@mui/icons-material/AddRounded';

/**
 * Banner used to navigate through quiz questions
 * @param quizLength length of the quiz
 * @param currentQuestion current question being viewed by the user
 * @param setCurrentQuestion function used to set the current question
 * @param isNewQuizBanner bool value that tells us whether the quiz is one that is being created or not
 * @param addQuestion function used to add a question
 * @returns banner element used for navigating quizzes
 */
export default function QuestionBanner({quizLength,currentQuestion,setCurrentQuestion, isNewQuizBanner, addQuestion}){

    let questionsDivs = [];

    //Adding all the questions to an array for navigation
    for (let i=0;i<quizLength;i++){
        if(i === currentQuestion){
            questionsDivs.push(
                <div key={"question" + i+1} className={"question-banner-item question-banner-current-item"}>
                    <h1>{i+1}</h1>
                </div>
            )
        }else{
            questionsDivs.push(
                <div key={"question" + i+1} className={"question-banner-item"} onClick={()=>{setCurrentQuestion(i)}}>
                    <h1>{i+1}</h1>
                </div>
            )
        }
    }

    return(
        <div className={"question-banner-container"}>
            {
                questionsDivs.map((questionDiv)=>questionDiv)

            }
            {isNewQuizBanner ? <div onClick={()=> addQuestion()} className={"question-banner-plus-item"}><AddRoundedIcon className="plus-icon" sx={{fontSize: 50}}/></div> : null}
        </div>
    )
}