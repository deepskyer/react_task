import React from "react";
import { Button, Chip } from "react-mdl";
import "./style/rating.css";

class Rating extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      rating: "",
      message:
        this.props.rating === 1
          ? "Just begin."
          : this.props.rating === 2
          ? "Work in progress."
          : this.props.rating === 3
          ? "Finished."
          : "Not started yet.",
      title: this.props.title,
      content: this.props.content,
      toTasklist: false,
      style: { color: "black" }
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  componentDidMount() {
    if (this.props.rating === null || this.props.rating === "") {
      this.setState({
        style: { backgroundColor: "#ff2d70", color: "white" }
      });
    }
  }

  handleChange(event) {
    this.setState({
      rating: event.target.value,
      style: { backgroundColor: "#eec168", color: "Black" },
      message: "Please save your update."
    });
  }

  handleSubmit(event) {
    event.preventDefault();
    if (this.props.rating === null) {
      this.props.onRead(this.state.rating);
    }
    this.setState({
      message: "You have updated the status successfully.",
      style: { backgroundColor: "#6eb544", color: "white" }
    });
    fetch(
      "https://floating-bastion-48526.herokuapp.com/api/tasks/" + this.props.id,
      {
        method: "PUT",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          title: this.state.title,
          content: this.state.content,
          rating: this.state.rating
        })
      }
    )
      .then(res => res.json())
      .then(result => {
        this.props.onUpdate(result);
      });
  }

  render() {
    return (
      <div className="rating">
        <form onSubmit={this.handleSubmit}>
          <br />
          <input
            type="radio"
            name="status"
            value="1"
            defaultChecked={this.props.rating === 1}
            onChange={this.handleChange}
          />
          BEGIN <span style={{ marginLeft: "10px" }} />
          <input
            type="radio"
            name="status"
            value="2"
            defaultChecked={this.props.rating === 2}
            onChange={this.handleChange}
          />
          WIP <span style={{ marginLeft: "10px" }} />
          <input
            type="radio"
            name="status"
            value="3"
            defaultChecked={this.props.rating === 3}
            onChange={this.handleChange}
          />
          DONE
          <br />
          <Button raised colored style={{ marginTop: "20px" }}>
            Save
          </Button>
        </form>
        <br />
        <Chip style={this.state.style}>{this.state.message}</Chip> <br />
        <br />
      </div>
    );
  }
}

export default Rating;
