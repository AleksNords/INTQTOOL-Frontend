import React from 'react';
import './index.css';
import App from './App';
import ReactDOM from "react-dom";
import {Provider} from "react-redux";
import {applyMiddleware, compose, createStore} from "redux";
import {BrowserRouter} from 'react-router-dom';
import reducer from "./store/reducer";
import {getConfiguredCache} from "money-clip";
import getPersistMiddleware from "redux-persist-middleware";
import {StyledEngineProvider} from '@mui/material/styles';

const rootElement = document.getElementById('root');
const cache = getConfiguredCache();

const userActionMap = {
    "SET_USER": ["userReducer"]
};

const loginStatusActionMap = {
    "SET_LOGGED": ["isLoggedReducer"]
};

const persistUser = getPersistMiddleware({
    cacheFn: cache.set,
    logger: console.info,
    actionMap: userActionMap
});

const persistLoginStatus = getPersistMiddleware({
    cacheFn: cache.set,
    logger: console.info,
    actionMap: loginStatusActionMap
});

cache.getAll().then((data) => {
    const store = createStore(
        reducer,
        data,
        compose(
            window.__REDUX_DEVTOOLS_EXTENSION__ &&
            window.__REDUX_DEVTOOLS_EXTENSION__()));


    ReactDOM.render(
        <StyledEngineProvider injectFirst>
            <React.StrictMode>

                <Provider store={store}>
                    <BrowserRouter>
                        <App/>
                    </BrowserRouter>
                </Provider>

            </React.StrictMode>
        </StyledEngineProvider>,
        rootElement
    );
});


