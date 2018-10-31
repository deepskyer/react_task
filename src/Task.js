import React, { Component }  from 'react';
import { Link } from "react-router-dom";
import {List, ListItem, ListItemContent} from 'react-mdl';

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

componentWillMount(){
    fetch('https://floating-bastion-48526.herokuapp.com/api/tasks')
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
        <div className="task">

        <h4>This is the list of all task</h4>
        <List>
          {things.slice(0).reverse().map(thing => (
            <ListItem key={thing._id}>
              <ListItemContent icon="assignment"><Link to={"/task/"+thing._id}>{thing.title}</Link></ListItemContent>
            </ListItem>
          ))}
        </List>

<hr />



        </div>


      );
    }
  }
}

export default Task;
