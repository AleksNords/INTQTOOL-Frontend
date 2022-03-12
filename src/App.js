import './App.css';
import React, {useEffect} from 'react';
import Navbar from "./components/navbar/Navbar";
import Login from "./components/modulo/login/Login";
import {Route,Routes} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import Home from "./components/home/Home";





function App() {
    const dispatch = useDispatch();

    const isLogged = useSelector(state => state.isLoggedReducer);



    return (
        <div className="App">
            <Navbar/>

            <div className="center-content">
                {(isLogged.isLogged === false) ? (
                    <Login/>
                ) : (isLogged.isLogged === true) ? (
                    <Routes>
                        <Route exact path={"/"} element={<Home/>}/>
                    </Routes>

                ) : null}


            </div>

        </div>
    );
}

export default App;
