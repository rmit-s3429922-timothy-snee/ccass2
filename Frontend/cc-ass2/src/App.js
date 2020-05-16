import React, {Component} from 'react';
import logo from './logo.svg';
import './App.css';
import {Link, Route,  BrowserRouter as Router, Switch} from "react-router-dom";
import NavBar from "./components/NavBar";
import Home from "./components/Home";
import MenuPlan from "./components/MenuPlan";
import Login from './components/Login';
import { useAuth0 } from "./react-auth0-spa";

class App extends Component {
    
    render() {
        const { loading } = useAuth0;

        if (loading) {
            return <div>Loading...</div>;
        }

        return (
            <Router>
                <div className="App">
                <header>
                    <NavBar />
                    <Switch>
                        <Route exact path='/' component={Home} />
                        <Route path='/menuPlan' component={MenuPlan} />
                    </Switch>
                </header>
                </div>
            </Router>
        );
    }
}

export default App;
