import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import './style/App.css';
import Task from './Task';
import statistic from './statistic';
import feedback from './feedback';
<<<<<<< HEAD
import dashboard from './dashboard';
=======
import Home from './Home';
import Taskview from './Taskview';
>>>>>>> 43be786cb8044269886ed9d16d5dc7d63560228e



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
<<<<<<< HEAD
        <Route exact path="/" component={dashboard} />
=======
        <Route exact path="/" component={Home} />
>>>>>>> 43be786cb8044269886ed9d16d5dc7d63560228e
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
