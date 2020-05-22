import React, {Component} from 'react';
import './App.css';
import {Route,  BrowserRouter as Router, Switch} from "react-router-dom";
import Home from "./components/Home";
import MenuPlan from "./components/MenuPlan";
import { useAuth0 } from "./react-auth0-spa";
import Profile from "./components/Profile";
import history from "./utils/history";
import PrivateRoute from './components/PrivateRoute';
import Pantry from './components/Pantry';
import NavBar from "./components/Navbar";

class App extends Component {
    
    render() {
        const { loading } = useAuth0;

        if (loading) {
            return <div>Loading...</div>;
        }

        return (
            <Router history={history}>
                <div className="App">
                <header>
                    <NavBar />
                    <Switch>
                        <Route exact path='/' component={Home} />
                        <PrivateRoute path='/menuPlan' component={MenuPlan} />
                        <PrivateRoute path='/profile' component={Profile} />
                        <PrivateRoute path='/pantry' component={Pantry} />
                    </Switch>
                </header>
                </div>
            </Router>
        );
    }
}

export default App;
