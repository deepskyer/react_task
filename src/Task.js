import React, { Component }  from 'react';
import {FABButton, Icon, Spinner, DataTable, TableHeader} from 'react-mdl';
import {Link} from 'react-router-dom';

class Task extends Component {
  constructor() {
    super();
    this.state = {
      error: null,
      isLoaded: false,
      things: [],
    };
  }
  componentWillUnmount() {
      this.isCancelled = true;
  }

componentDidUpdate(){


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

      //console.log(this.state.things),
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
    const { error, isLoaded, things } = this.state;


    if (error) {
      return <div>Error: {error.message}</div>;
    } else if (!isLoaded) {
      return <div style={{margin: '300px auto', width: '200px'}}><Spinner/></div>;
    } else {
      return (
        <div className="task">

        <h4>This is the list of all task</h4>

        <DataTable shadow={0} rows={things.slice(0).reverse()}>
          <TableHeader name="title" cellFormatter={(title) => title.length>=30?title.substring(0, 30)+'...':title}tooltip="The task name">Task</TableHeader>
          <TableHeader name="_id" cellFormatter={(_id) =>   <Link to={"/task/"+_id}>Check</Link>} tooltip="The details of the task.">Details</TableHeader>
          <TableHeader name="content" cellFormatter={(content) => content.length>=50?content.substring(0, 50)+'...':content} tooltip="Comment of the task">Comment</TableHeader>
          <TableHeader numeric name="rating" tooltip="Out of 5">Rating</TableHeader>
        </DataTable>

        <Link to="/">
          <FABButton colored ripple style={{position: 'fixed',
          bottom: '20px',
          right: '20px'}}>
              <Icon name="add" />
          </FABButton>
        </Link>
        </div>
      );
    }
  }
}

export default Task;
