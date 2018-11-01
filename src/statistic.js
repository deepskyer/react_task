import React, { Component }  from 'react';
import {Bar} from 'react-chartjs-2';
import {Spinner} from 'react-mdl';

class Statistic extends Component {
  constructor() {
    super();
    this.state = {
      error: null,
      isLoaded: false,
      things: [],
      good: 0,
      bad: 0,
      unrated: 0,
      limit: 10
    };
  }

  componentDidMount() {


    fetch('https://floating-bastion-48526.herokuapp.com/api/tasks')
      .then(res => res.json())
      .then(
        (result) => {
          this.setState({
            isLoaded: true,
            things: result,
            good: result.filter(thing => thing.rating >= 3).length,
            bad: result.filter(thing => thing.rating < 3).length,
            unrated: result.filter(thing => thing.rating === null).length,
            limit: result.length,
          });

        },

        (error) => {
          this.setState({
            isLoaded: true,
            error
          });
        },

      )
  }

  render() {
    const { error, isLoaded, things, good, bad, unrated } = this.state;

    const data = {
    labels: ['Good', 'Bad', 'Unrated'],
    datasets: [
      {
        label: 'My tasks',
        backgroundColor: 'rgba(255,99,132,0.2)',
        borderColor: 'rgba(255,99,132,1)',
        borderWidth: 1,
        hoverBackgroundColor: 'rgba(255,99,132,0.4)',
        hoverBorderColor: 'rgba(255,99,132,1)',
        data: [good, bad, unrated]
      }
    ]
  };

  const options = {scales:
    {
      yAxes: [{ ticks: { beginAtZero: true, fontSize: 16, min: 0, max: this.state.limit} }],
      xAxes: [{ ticks: { beginAtZero: true, fontSize: 16, min: 0, max: 6} }]
    }
};

    if (error) {
      return <div>Error: {error.message}</div>;
    } else if (!isLoaded) {
      return <div style={{margin: '300px auto', width: '200px'}}><Spinner/></div>;
    } else {


      return (
        <div className="task">



        <h4>This is a statistic component</h4>

        <h4>There are {things.length} tasks.</h4>
        There are {good} good tasks, there are {bad} bad tasks and {unrated} unrated tasks.
        <div className="barChart" >
        <Bar data={data} width={50} height={50} options={options} />
        </div>

        </div>


      );
    }
  }
}

export default Statistic;
