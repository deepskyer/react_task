import React, { Component }  from 'react';
import Rating from './Rating'

import './style/task.css';

class feedback extends Component {
  constructor() {
    super();
    this.state = {
      error: null,
      isLoaded: false,
      things: []
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

          });

        },


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
    const { error, isLoaded, things} = this.state;


    if (error) {
      return <div>Error: {error.message}</div>;
    } else if (!isLoaded) {
      return <div>Loading...</div>;
    } else {


      return (
        <div className="task">

        <h4>This is the feedback component</h4>
        <ul>
          {things.map(thing => (
            <li key={thing._id}>
              {thing.title}: {thing.content}
              <Rating name={thing.title}/>
            </li>
          ))}
        </ul>


        </div>


      );
    }
  }
}

export default feedback;
