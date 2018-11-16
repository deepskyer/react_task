import React, { Component }  from 'react';
import {Bar} from 'react-chartjs-2';
import {Card, CardTitle, CardText, Spinner} from 'react-mdl';

class Statistic extends Component {
  constructor() {
    super();
    this.state = {
      error: null,
      isLoaded: false,
      things: [],
      begin: 0,
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
            begin: result.filter(thing => thing.rating === 1).length,
            wip : result.filter(thing => thing.rating === 2).length,
            done: result.filter(thing => thing.rating === 3).length,
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
    const { error, isLoaded, things, begin, wip, done, unrated } = this.state;

    const data = {
    labels: ['Todo', 'Start', 'WIP', 'Done'],
    datasets: [
      {
        label: 'My tasks',
        backgroundColor: 'rgba(255, 255, 255, 1)',
        borderColor: 'rgba(255, 255, 255, 1)',
        borderWidth: 0,
        hoverBackgroundColor: 'rgba(255, 255, 255, 0.9)',
        hoverBorderColor: 'rgba(255, 255, 255, 0.9)',
        data: [unrated, begin, wip, done]
      }
    ]
  };

  const options = {scales:
    {
      yAxes: [{ ticks: { beginAtZero: true, fontSize: 13, fontColor: '#fff', min: 0, max: this.state.limit}, gridLines: {display:false} }],
      xAxes: [{ ticks: { beginAtZero: true, fontSize: 13, fontColor: '#fff', min: 0, max: 6}, gridLines: {display:false}  }]
    },

    layout: {
            padding: {
                left: 10,
                right: 0,
                top: 0,
                bottom: 0
            }
        },
    legend: {
            labels: {
                fontColor: '#fff',
            }
        },
        title: {

                    fontColor: '#fff',

            }
};

    if (error) {
      return <div>Error: {error.message}</div>;
    } else if (!isLoaded) {
      return <div style={{margin: '300px auto', width: '200px'}}><Spinner/></div>;
    } else {


      return (
        <div style={{width: '80%', margin: '30px auto', textAlign: 'center'}}>
        <h4>This is an assessment of tasks</h4>
        <Card shadow={0} style={{margin: 'auto'}}>
          <CardTitle expand style={{color: '#fff', backgroundImage: 'linear-gradient(to bottom right, #A471E1, #6C77E1)'}}><div className="barChart" >
          <Bar data={data} width={50} height={50} options={options}/>
          </div></CardTitle>
          <CardText style={{textAlign: 'left', height: '120px', color: '#CDCDCD'}}>

          {begin} {begin>1?"tasks get":"task gets"} started. There {wip>1?"are":"is"} {wip} {wip>1?"tasks":"task"} in process,  and {unrated} {unrated>1?"tasks have":"task has"} not been started. {(done===0)?"None":done} {done>1?"tasks have": " task has"} been finished.
          <br/>
          <h3 style={{weight: 'bold', color: '#787878'}}>{things.length} Tasks</h3>
          <br/>
          </CardText>
        </Card>




        </div>
      );
    }
  }
}

export default Statistic;
