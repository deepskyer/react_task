import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import './style/App.css';
import Task from './Task';
import statistic from './statistic';
import feedback from './feedback';
import {Icon, Badge, Layout, Header, Navigation } from 'react-mdl';
import Home from './Home';
import Taskview from './Taskview';


class App extends Component {
  constructor() {
    super();
    this.state = {
      error: null,
      unrated: null
    };
  }

  componentDidUpdate() {
    fetch('https://floating-bastion-48526.herokuapp.com/api/tasks')
      .then(res => res.json())
      .then(
        (result) => {
          this.setState({
            isLoaded: true,
            things: result,
            unrated: result.filter(thing => thing.rating === null).length,
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

  componentDidMount() {
    fetch('https://floating-bastion-48526.herokuapp.com/api/tasks')
      .then(res => res.json())
      .then(
        (result) => {
          this.setState({
            isLoaded: true,
            things: result,
            unrated: result.filter(thing => thing.rating === null).length,
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

render(){
    return (

      <Router>

        <div>
    <Layout fixedHeader>
        <Header title="{ Tasks Review }" style={{color: 'white'}}>
            <Navigation>
              <Link to="/">Home</Link>
              <Link to="/tasks">Tasks</Link>
              <Link to="/feedback"><Badge text={(this.state.unrated===null || this.state.unrated===0)?null:this.state.unrated}>Review</Badge></Link>
              <Link to="/statistic"><Icon name="assessment" style={{marginRight: 10}}></Icon>Statistic</Link>
            </Navigation>
        </Header>
        <Route exact path="/" component={Home} />
        <Route path="/tasks" component={Task} />
        <Route path="/feedback" component={feedback} />
        <Route path="/statistic" component={statistic} />
        <Route path="/task/:id" component={Taskview} />
    </Layout>

      </div>
    </Router>

    );

}



}

export default App;
