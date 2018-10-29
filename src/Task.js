import React, { Component }  from 'react';
<<<<<<< HEAD
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import Taskview from './Taskview';

=======
import { Link } from "react-router-dom";
>>>>>>> 43be786cb8044269886ed9d16d5dc7d63560228e
import './style/task.css';

class Task extends Component {
  constructor() {
    super();
    this.state = {
      error: null,
      isLoaded: false,
      things: [],
      good: 0,
      bad: 0,
      count: 0
    };
    this.componentDidMount = this.componentDidMount.bind(this);
  }

  componentDidMount() {


    fetch('https://floating-bastion-48526.herokuapp.com/api/tasks')
      .then(res => res.json())
      .then(
        (result) => {
          this.setState({
            isLoaded: true,
            things: result,
            count: this.state.count+1,
            good: result.filter(thing => thing.title.startsWith("good")).length,
            bad: result.filter(thing => thing.title.startsWith("bad")).length,

          });

        },

        console.log("reload times: " + this.state.count),

        (error) => {
          this.setState({
            isLoaded: true,
            error
          });
        },

        //console.log(this.state.things),
      )
  }

  render() {
    const { error, isLoaded, things } = this.state;


    if (error) {
      return <div>Error: {error.message}</div>;
    } else if (!isLoaded) {
      return <div>Loading...</div>;
    } else {


      return (
        <Router>
        <div className="task">

        <h4>This is the list of all task</h4>
        <ul>
          {things.map(thing => (
            <li key={thing.title}>
<<<<<<< HEAD
              <Link to={"/task/"+thing._id}>{thing.title}</Link>
=======
              <Link to={"task/" + thing._id}>{thing.title}</Link>
>>>>>>> 43be786cb8044269886ed9d16d5dc7d63560228e
            </li>


          ))}
        </ul>

<hr />

    <Route exact path="/task/:id" component={Taskview} />






        <hr />


        </div>

        </Router>
      );
    }
  }
}

export default Task;
