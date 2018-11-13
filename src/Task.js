import React, { Component }  from 'react';
import {FABButton, Icon, Spinner, DataTable, TableHeader} from 'react-mdl';
import {Link} from 'react-router-dom';

class Task extends Component {

  componentDidMount(){
    this.props.nodirect();
  }

  render() {
    const { error, isLoaded, things } = this.props;


    if (error) {
      return <div>Error: {error.message}</div>;
    } else if (!isLoaded) {
      return <div style={{margin: '300px auto', width: '200px'}}><Spinner/></div>;
    } else {
      return (
        <div className="task">

        <h4>The list of all tasks.</h4>

        <DataTable shadow={0} rows={things.slice(0).reverse()}>
          <TableHeader name="title" cellFormatter={(title) => title.length>=10?title.substring(0, 10)+'...':title}tooltip="The task name">Task</TableHeader>
          <TableHeader name="_id" cellFormatter={(_id) =>   <Link to={"/task/"+_id}>Check</Link>} tooltip="The details of the task.">Details</TableHeader>
          <TableHeader numeric name="rating" tooltip="Out of 5">Rating</TableHeader>
        </DataTable>

        <Link to="/" onClick = {this.props.onNew}>
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
