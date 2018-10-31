import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import './style/App.css';
import Task from './Task';
import statistic from './statistic';
import feedback from './feedback';

import Home from './Home';
import Taskview from './Taskview';




class App extends Component {
render(){
    return (

      <Router>
      <div className="App">
        <ul>
          <li>
            <Link to="/">Home</Link>
          </li>
          <li>
            <Link to="/tasks">Tasks</Link>
          </li>
          <li>
            <Link to="/feedback">Review</Link>
          </li>
          <li>
            <Link to="/statistic">Statistic</Link>
          </li>
        </ul>


        <Route exact path="/" component={Home} />
        <Route path="/tasks" component={Task} />
        <Route path="/feedback" component={feedback} />
        <Route path="/statistic" component={statistic} />
        <Route path="/task/:id" component={Taskview} />


      </div>
    </Router>

    );

}



}

export default App;
