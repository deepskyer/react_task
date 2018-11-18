import React from "react";
import { Redirect } from "react-router-dom";
import { Button } from "react-mdl";

class Taskview extends React.Component {
  constructor() {
    super();
    this.state = {
      error: null,
      isLoaded: false,
      thing: null,
      toReview: false
    };
  }

  componentDidMount() {
    let url =
      "https://floating-bastion-48526.herokuapp.com/api/tasks/" +
      this.props.match.params.id;

    fetch(url)
      .then(res => res.json())
      .then(
        result => {
          this.setState({
            isLoaded: true,
            thing: result
          });
        },

        error => {
          this.setState({
            isLoaded: true,
            error
          });
        }
      );
  }

  reviewHandler = event => {
    this.setState({
      toReview: true
    });
  };

  render() {
    const { error, isLoaded, thing, toReview } = this.state;
    const { toTasklist } = this.props;

    if (toTasklist) {
      return <Redirect to="/" />;
    } else if (toReview) {
      return (
        <Redirect
          to={{
            pathname: "/review",
            state: { thing: thing }
          }}
        />
      );
    } else if (error) {
      return (
        <div style={{ margin: "300px auto", width: "200px" }}>
          Error: {error.message}
        </div>
      );
    } else if (!isLoaded) {
      return (
        <div style={{ margin: "300px auto", width: "200px" }}>Loading...</div>
      );
    } else {
      return (
        <div className="taskview">
          <h2>{thing.title}</h2>
          <h4>
            Created At: {thing.createdAt.substring(0, 10)} | Updated At:{" "}
            {thing.updatedAt.substring(0, 10)}
          </h4>
          <h4>
            Status:{" "}
            {thing.rating === 1
              ? "Begin"
              : thing.rating === 2
              ? "WIP"
              : thing.rating === 3
              ? "Done"
              : "Not started"}
          </h4>
          <br />
          <p>{thing.content}</p>
          <hr />
          <Button
            id="delete"
            onClick={() => this.props.onDelete(thing)}
            raised
            ripple
            accent
          >
            Delete
          </Button>{" "}
          <Button
            id="updatestatus"
            onClick={this.reviewHandler}
            raised
            colored
            ripple
            style={{ marginLeft: "10px" }}
          >
            Update Status
          </Button>
        </div>
      );
    }
  }
}

export default Taskview;
