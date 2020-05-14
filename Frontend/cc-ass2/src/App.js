import React, { Component} from 'react';
import './App.css';
import Greeting from './component/Greeting';

class App extends Component {

  constructor(props) {
    super(props);
    this.state = {isLoggedIn: false};
  }

  render() {
    return (
      <>
        <div>
          <Greeting isLoggedIn={true}/>
        </div>
      </>
    );
  }
}

export default App;
