import React from 'react';
import './question.css';

export default function Question({question}) {


    return (
        <div>
            <h1>{question.question}</h1>
        </div>)
}