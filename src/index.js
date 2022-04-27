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
// TODO - why the cache? Storing in cookies is not good enough? :)
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

// TODO - check all the warnings you get in the JS console, most of them are valid. Ideally - no warnings should be
// in the console. They should not be simply suppressed either :)

cache.getAll().then((data) => {
    // TODO - there are newer and better alternatives for Redux, but perhaps no time to re-write it now?
    const store = createStore(
        reducer,
        data,
        compose(applyMiddleware(persistUser,persistLoginStatus)));


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


