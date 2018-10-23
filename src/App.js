import React, { Component } from 'react';
import './style/App.css';
import Task from './Task';

class App extends Component {
  render() {
    return (
      <div className="App">
      <h3>This is the app component</h3>
      <Task/>
      </div>

    );
  }
}

export default App;
