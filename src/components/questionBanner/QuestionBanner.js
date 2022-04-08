import React from 'react';
import './questionbanner.css';

export default function QuestionBanner({quizLength,currentQuestion,setCurrentQuestion}){
    let questionsDivs =[];

    for (let i=0;i<quizLength;i++){
        if(i === currentQuestion){
            questionsDivs.push(
                <div key={i+1} className={"question-banner-item question-banner-current-item"}>
                    <h1>{i+1}</h1>
                </div>
            )
        }else{
            questionsDivs.push(
                <div key={i+1} className={"question-banner-item"} onClick={()=>{setCurrentQuestion(i)}}>
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
        </div>
    )
}