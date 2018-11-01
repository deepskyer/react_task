import React, { Component }  from 'react';
import Rating from './Rating'
import {CardTitle, CardText, CardActions, Card, Grid, Cell} from 'react-mdl';
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
        <div className="feedback" style={{width: '90%', margin: 'auto'}}>

        <h4>This is the review component</h4>
        <div>
          <Grid>
          {things.slice(0).reverse().map(thing => (<Cell col={4}><Card shadow={0} style={{width: '320px', height: '350px', margin: '30px'}}>
              <CardTitle expand style={{color: '#fff', background: 'url(http://www.getmdl.io/assets/demos/dog.png) bottom right 5% no-repeat #46B6AC'}}>{thing.title}</CardTitle>
              <CardText>
                  {thing.content}
              </CardText>
              <CardActions border>
                  <Rating name={thing.title} rating={thing.rating} id={thing._id} title={thing.title} content={thing.content}/>
              </CardActions>
          </Card></Cell>))}
          </Grid>
        </div>



        </div>


      );
    }
  }
}

export default feedback;
