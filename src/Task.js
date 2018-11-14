import React, { Component } from "react";
import { FABButton, Icon, Spinner, DataTable, TableHeader } from "react-mdl";
import { Link } from "react-router-dom";

class Task extends Component {
  componentDidMount() {
    this.props.nodirect();
  }

  render() {
    const { error, isLoaded, things } = this.props;


    if (error) {
      return <div>Error: {error.message}</div>;
    } else if (!isLoaded) {
      return (
        <div style={{ margin: "300px auto", width: "200px" }}>
          <Spinner />
        </div>
      );
    }
    else if (things.length === 0) {
      return (
        <div style={{ margin: "300px auto", width: "200px" }}>
          No task, Please create one.

          <Link to="/create" onClick={this.props.onNew}>
            <FABButton
              colored
              ripple
              style={{ position: "fixed", bottom: "20px", right: "20px" }}
            >
              <Icon name="add" />
            </FABButton>
          </Link>

        </div>
      );
    }
    else {
      return (
        <div className="task">
          <h4>The list of all tasks.</h4>

          <DataTable shadow={0} rows={things.slice(0).reverse()}>
            <TableHeader
              name="title"
              cellFormatter={title =>
                title.length >= 3 ? title.substring(0, 3) + "..." : title
              }
              tooltip="The task name"
            >
              Task
            </TableHeader>
            <TableHeader
              name="_id"
              cellFormatter={_id => <Link to={"/task/" + _id}>Check</Link>}
              tooltip="The details of the task."
            >
              Details
            </TableHeader>
            <TableHeader name="content"   cellFormatter={title =>
                title.length >= 4 ? title.substring(0, 4) + "..." : title
              }
              tooltip="Content Prview">
              Content
            </TableHeader>
            <TableHeader name="rating" cellFormatter={(rating)=>`${rating===1?"Begin":rating===2?"WIP":rating===3?"Done":"Not started"}`} tooltip="Status of the tasks">
              Status
            </TableHeader>
          </DataTable>

          <Link to="/create" onClick={this.props.onNew}>
            <FABButton
              colored
              ripple
              style={{ position: "fixed", bottom: "20px", right: "20px" }}
            >
              <Icon name="add" />
            </FABButton>
          </Link>
        </div>
      );
    }
  }
}

export default Task;
