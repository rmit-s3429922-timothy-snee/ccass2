import React, {Component} from 'react';
import logo from './logo.svg';
import './App.css';
import {Link, Route,  BrowserRouter as Router, Switch} from "react-router-dom";
import NavBar from "./components/Navbar";
import Home from "./components/Home";
import MenuPlan from "./components/MenuPlan";

class App extends Component {
    render() {
        return (
            <Router>
                <div>
                    <NavBar/>
                    <Switch>
                        <Route exact path='/' component={Home} />
                        <Route path='/menuPlan' component={MenuPlan} />
                    </Switch>
                </div>
            </Router>



        );
    }
}

export default App;
