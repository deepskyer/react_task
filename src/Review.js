import React, { Component }  from 'react';
import Rating from './Rating'
import {Icon, Spinner, CardTitle, CardText, CardActions, Card, Grid, Cell} from 'react-mdl';
import './style/task.css';

class Review extends Component {
  constructor(props) {
    super(props);
    this.state = {
      error: null,
      isLoaded: false,
      things: props.things,
      unrated: props.things.filter(f=>f.rating === null).length
    };
  }

  creatCard = () => {
    var cellRow = []
    var i,j,temparray,chunk = 3;
for (i=0,j=this.state.things.length; i<j; i+=chunk) {
  temparray = this.state.things.slice(i,i+chunk);
  cellRow.push(<cell>temparray[0]</cell>);
  console.log(cellRow);
}
  }

  componentWillUnmount(){
    this.setState({
      things: [],
      unrated: 0,
    });
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

    this.creatCard();

    if (error) {
      return <div>Error: {error.message}</div>;
    } else if (!isLoaded) {
      return <div style={{margin: '300px auto', width: '200px'}}><Spinner/></div>;
    } else {

      const {onRead} = this.props;



      return (
        <div className="feedback" style={{width: '90%', margin: '0'}}>
          <div style ={{marginTop: '30px'}}>
          <Grid>
          <Cell  col={3}>{things.slice(0).map(thing => (<Card key={thing._id} shadow={0} style={{width: '320px', height: '350px', marginLeft: '50px', marginTop: '30px'}}>
              <CardTitle expand style={{color: '#fff', background: '#4a148c'}}><Icon name="assignment" style={{marginRight: '9px'}}/>{thing.title.length>=30?thing.title.substring(0, 30)+'...':thing.title}</CardTitle>
              <CardText style={{color: '#565656', background: '#fff', textAlign: 'left', height: '120px'}}>
                  {thing.content.length>=290?thing.content.substring(0, 290)+'...':thing.content}
              </CardText>
              <CardActions border>
                  <Rating name={thing.title} rating={thing.rating} id={thing._id} title={thing.title} content={thing.content} onUpdate = {this.props.onUpdate}
                  onRead = {onRead}
                  />
              </CardActions>
          </Card>))}</Cell>
          </Grid>
          </div>
        </div>


      );
    }
  }
}

export default Review;
