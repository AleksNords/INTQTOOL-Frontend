import './App.css';
import Navbar from "./components/navbar/Navbar";
import Login from "./components/modulo/login/Login";

function App() {
    return (
        <div className="App">
            <Navbar/>
            <div className="center-content">
                <Login/>
            </div>
        </div>
    );
}

export default App;
