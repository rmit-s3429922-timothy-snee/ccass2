import React, { Component} from 'react';
import Main from './component/Main';
import './App.css';
import ListRecipes from './component/ListRecipes';

class App extends Component {
  render() {
    return (
      <>
        <div className="container">
          <Main />
        </div>
      </>
    );
  }
}

export default App;
