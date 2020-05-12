import React, { Component} from 'react';
import RecipeTest from './component/recipeTest';
import './App.css';

class App extends Component {
  render() {
    return (
      <>
        <div className="container">
          <RecipeTest />
        </div>
      </>
    );
  }
}

export default App;
