import React, { Component }  from 'react';
import Rating from './Rating'
import {Icon, Spinner, CardTitle, CardText, CardActions, Card, Grid, Cell} from 'react-mdl';
import './style/task.css';

class Review extends Component {
  constructor() {
    super();
    this.state = {
      error: null,
      isLoaded: false,
      things: [],
      unrated: 0
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
            unrated: result.filter(thing => thing.rating === null).length,
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
    const {onRead} = this.props;


    if (error) {
      return <div>Error: {error.message}</div>;
    } else if (!isLoaded) {
      return <div style={{margin: '300px auto', width: '200px'}}><Spinner/></div>;
    } else {


      return (
        <div className="feedback" style={{width: '90%', margin: 'auto'}}>
          <div style ={{marginTop: '30px'}}>
          <Grid>
          {things.slice(0).reverse().map(thing => (<Cell key={thing._id} col={3}><Card  shadow={0} style={{width: '320px', height: '350px', margin: '15px'}}>
              <CardTitle expand style={{color: '#fff', background: '#4a148c'}}><Icon name="assignment" style={{marginRight: '9px'}}/>{thing.title.length>=30?thing.title.substring(0, 30)+'...':thing.title}</CardTitle>
              <CardText style={{color: '#565656', background: '#fff', textAlign: 'left', height: '120px'}}>
                  {thing.content.length>=290?thing.content.substring(0, 290)+'...':thing.content}
              </CardText>
              <CardActions border>
                  <Rating name={thing.title} rating={thing.rating} id={thing._id} title={thing.title} content={thing.content}
                  onRead = {onRead}
                  />
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
