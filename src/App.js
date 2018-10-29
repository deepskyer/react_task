import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import './style/App.css';
import Task from './Task';
import statistic from './statistic';
import feedback from './feedback';
import dashboard from './dashboard';



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
            <Link to="/feedback">Feedback</Link>
          </li>
          <li>
            <Link to="/statistic">Statistic</Link>
          </li>
        </ul>

        <hr />
        <Route exact path="/" component={dashboard} />
        <Route path="/tasks" component={Task} />
        <Route path="/feedback" component={feedback} />
        <Route path="/statistic" component={statistic} />
      </div>
    </Router>

    );

}



}

export default App;
