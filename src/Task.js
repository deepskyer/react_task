import React, { Component }  from 'react';
import {Bar} from 'react-chartjs-2';

import './style/task.css';

class Task extends Component {
  constructor() {
    super();
    this.state = {
      error: null,
      isLoaded: false,
      things: [],
      good: 0,
      bad: 0
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
            good: result.filter(thing => thing.title.startsWith("good")).length,
            bad: result.filter(thing => thing.title.startsWith("bad")).length,

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
    const { error, isLoaded, things, good, bad } = this.state;

    const data = {
    labels: ['Good', 'Bad'],
    datasets: [
      {
        label: 'My tasks',
        backgroundColor: 'rgba(255,99,132,0.2)',
        borderColor: 'rgba(255,99,132,1)',
        borderWidth: 1,
        hoverBackgroundColor: 'rgba(255,99,132,0.4)',
        hoverBorderColor: 'rgba(255,99,132,1)',
        data: [good, bad]
      }
    ]
  };

  const options = {scales:
    {
      yAxes: [{ ticks: { beginAtZero: true, fontSize: 16, min: 0, max: 10} }],
      xAxes: [{ ticks: { beginAtZero: true, fontSize: 16, min: 0, max: 6} }]
    }
};

    if (error) {
      return <div>Error: {error.message}</div>;
    } else if (!isLoaded) {
      return <div>Loading...</div>;
    } else {


      return (
        <div className="task">

        <button onClick={this.componentDidMount}>reload</button>
        <h4>This is a task component</h4>
        <ul>
          {things.map(thing => (
            <li key={thing.title}>
              {thing.title}: {thing.content}
            </li>
          ))}
        </ul>

        <h4>There are {things.length} tasks.</h4>
        There are {good} good tasks, There are {bad} bad tasks.
        <div className="barChart" >
        <Bar data={data} width={50} height={50} options={options} />
        </div>

        </div>


      );
    }
  }
}

export default Task;
