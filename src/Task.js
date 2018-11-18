import React, { Component } from "react";
import {
  Chip,
  FABButton,
  Icon,
  Spinner,
  DataTable,
  TableHeader
} from "react-mdl";
import { Link } from "react-router-dom";

class Task extends Component {
  componentDidMount() {
    this.props.nodirect();
  }

  render() {
    const { error, isLoaded, things } = this.props;

    if (error) {
      return (
        <div style={{ margin: "300px auto", width: "200px" }}>
          Error: {error.message}
        </div>
      );
    } else if (!isLoaded) {
      return (
        <div style={{ margin: "300px auto", width: "200px" }}>
          <Spinner />
        </div>
      );
    } else if (things.length === 0) {
      return (
        <div style={{ margin: "300px auto", width: "200px" }}>
          No task. Please create one.
          <Link to="/create" onClick={this.props.onNew}>
            <FABButton
              id="plus"
              colored
              ripple
              style={{ position: "fixed", bottom: "20px", right: "20px" }}
            >
              <Icon name="add" />
            </FABButton>
          </Link>
        </div>
      );
    } else {
      return (
        <div className="task">
          <h4>The list of all tasks.</h4>

          <DataTable id="tasklist" shadow={0} rows={things.slice(0).reverse()}>
            <TableHeader
              name="title"
              cellFormatter={title =>
                title.length >= 8 ? title.substring(0, 8) + "..." : title
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
            <TableHeader
              name="rating"
              cellFormatter={rating => (
                <Chip
                  style={{
                    backgroundColor: `${
                      rating === 1
                        ? "#48B7ED"
                        : rating === 2
                        ? "#7ED450"
                        : rating === 3
                        ? "#6450D4"
                        : "#FF6268"
                    }`,
                    color: "white"
                  }}
                >
                  {rating === 1
                    ? "Begin"
                    : rating === 2
                    ? "WIP"
                    : rating === 3
                    ? "Done"
                    : "Not started"}
                </Chip>
              )}
              tooltip="Status of the tasks"
            >
              Status
            </TableHeader>
          </DataTable>

          <Link to="/create" onClick={this.props.onNew}>
            <FABButton
              id="plus"
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
