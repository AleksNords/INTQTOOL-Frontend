import './App.css';
import Navbar from "./components/navbar/Navbar";
import Login from "./components/modulo/login/Login";
import {Switch, Route} from "react-router-dom";

function App() {
    return (
        <div className="App">
            <Navbar/>
            <Switch>
            <div className="center-content">
                <Login/>
            </div>
            </Switch>
        </div>
    );
}

export default App;
