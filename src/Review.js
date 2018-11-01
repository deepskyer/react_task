import React, { Component }  from 'react';
import Rating from './Rating'
import {Spinner, CardTitle, CardText, CardActions, Card, Grid, Cell} from 'react-mdl';
import './style/task.css';

class Review extends Component {
  constructor() {
    super();
    this.state = {
      error: null,
      isLoaded: false,
      things: []
    };
  }

  componentWillUnmount() {
    this.isCancelled = true;
}

componentDidUpdate() {


  fetch('https://floating-bastion-48526.herokuapp.com/api/tasks')
    .then(res => res.json())
    .then(
      (result) => {
        !this.isCancelled && this.setState({
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
    const { error, isLoaded, things} = this.state;


    if (error) {
      return <div>Error: {error.message}</div>;
    } else if (!isLoaded) {
      return <Spinner style={{margin: '200px auto', width: '100px' }}/>;
    } else {


      return (
        <div className="feedback" style={{width: '90%', margin: 'auto'}}>
        <div>
          <Grid>
          {things.slice(0).reverse().map(thing => (<Cell key={thing._id} col={3}><Card  shadow={0} style={{width: '320px', height: '350px', margin: '30px'}}>
              <CardTitle expand style={{color: '#52006d', background: '#fcfcfc'}}>{thing.title}</CardTitle>
              <CardText style={{color: '#565656', background: '#fcfcfc', textAlign: 'left', height: '120px'}}>
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

export default Review;
