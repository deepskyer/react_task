import React, { Component }  from 'react';
import { Link } from "react-router-dom";
import {Spinner, DataTable, TableHeader} from 'react-mdl';

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
      return <Spinner />;
    } else {


      return (
        <div className="task">

        <h4>This is the list of all task</h4>

        <DataTable
         shadow={0}
         rows={this.state.things}
    >
    <TableHeader name="title" tooltip="The task name">Task</TableHeader>
    <TableHeader name="_id" cellFormatter={(_id) => <a href={"/task/"+_id}>Check</a>} tooltip="Out of 10">Details</TableHeader>
    <TableHeader name="content" cellFormatter={(content) => content.substring(0, 200)} tooltip="Comment of the task">Comment</TableHeader>
    <TableHeader numeric name="rating" tooltip="Out of 10">Rating</TableHeader>


    </DataTable>




        </div>


      );
    }
  }
}

export default Task;
