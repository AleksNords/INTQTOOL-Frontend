import React from 'react';
import './index.css';
import App from './App';
import ReactDOM from "react-dom";
import {Provider} from "react-redux";
import {createStore, applyMiddleware, compose} from "redux";
import dataReducer from "./store/reducer/dataReducer";
import thunk from "redux-thunk";
import {BrowserRouter} from 'react-router-dom';

const reduxStore = createStore(
    dataReducer,
    compose(applyMiddleware(thunk))
);

const rootElement = document.getElementById('root');
ReactDOM.render(
    <React.StrictMode>
        <Provider store={reduxStore}>
            <BrowserRouter>
                <App/>
            </BrowserRouter>
        </Provider>
    </React.StrictMode>,
    rootElement
);

