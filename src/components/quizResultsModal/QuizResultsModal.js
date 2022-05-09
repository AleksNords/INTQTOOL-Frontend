import React, {useEffect, useState} from 'react';
import './quizresultsmodal.css';
import {Box, CircularProgress, Grid, Typography} from "@mui/material";

/**
 * Modal displaying the results on a quiz
 * @param resultArray array representing the students results
 * @param setCurrentQuestion function used to set the current question
 * @param setShowResultsModal function used to show and hide the modal
 * @returns modal displaying student results on a quiz
 */
export default function QuizResultsModal({resultArray, setCurrentQuestion, setShowResultsModal}) {

    const [result, setResult] = useState(0);

    /**
     * Calculates the percentage of correct answers and rounds the number
     */
    useEffect(() => {
        let maxPoints = resultArray.length;
        let points = 0;
        for (let i = 0; i < resultArray.length; i++) {
            points += resultArray[i].grading;
        }
        setResult(Math.round((100 * points) / maxPoints));
    }, []);

    /**
     * Determines a class for a provided question answer
     * @param questionAns provided question answer
     * @returns classname for the provided question representing the received grading
     */
    function getQuestionGradeColor(questionAns) {
        let grading = questionAns.grading;

        if (grading > 0 && grading < 1) {
            grading = 0.5;
        }

        let classString;
        switch (grading) {

            case 1:
                classString = "correct-grading";
                break;


            case 0.5:
                classString = "partial-grading";
                break;

            case 0:
                //We enable the fall through as we want this span if none of the above conditions apply,
                //but the value is 0 if no grading is received, which means we need to check the status of the question
                if (questionAns.status === "graded") {
                    classString = "incorrect-grading";
                    break;
                }

            default:
                classString = "ungraded-grading";
        }
        return classString;
    }

    /**
     * Redirects the user to the clicked question
     * @param event triggered by the click
     */
    function handleQuestionClick(event) {
        setCurrentQuestion((event.target.innerHTML) - 1);
        setShowResultsModal(false);
    }

    return (
        <div className="quiz-results-modulo">
            <div className="modal-flex-wrapper">
                <h1 className="results-header">Well done!</h1>
                <h3 className="result-secondary-header">Results</h3>
                <Grid className="question-grid" container spacing={1}>
                    <Grid item xs={12}>
                        <Grid container spacing={1}>
                            {resultArray.map((questionAns, index) => (
                                <Grid key={questionAns} item>
                                    <Box onClick={(index) => (handleQuestionClick(index))}
                                         className={"grid-elem " + getQuestionGradeColor(questionAns)}>{index + 1}</Box>
                                </Grid>
                            ))}
                        </Grid>
                    </Grid>
                </Grid>
            </div>
            <Box className="progress-box" sx={{position: 'relative', display: 'inline-flex'}}>
                <CircularProgress size="25rem" variant="determinate" value={result}/>
                <Box
                    sx={{
                        top: 0,
                        left: 0,
                        bottom: 0,
                        right: 0,
                        position: 'absolute',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                    }}
                >
                    <Typography fontSize={"8rem"} fontWeight={"bold"} variant="caption" component="div"
                                color="text.secondary">
                        {`${result}%`}
                    </Typography>
                </Box>
            </Box>
        </div>
    )
}