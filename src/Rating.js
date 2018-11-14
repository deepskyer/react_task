import React from "react";
import { Button, Chip } from "react-mdl";
import "./style/rating.css";

class Rating extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      rating: "",
      message: this.props.rating
        ? "Rated " + this.props.rating
        : "Not rate yet.",
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
      message: "Please save your rating."
    });
  }

  handleSubmit(event) {
    event.preventDefault();
    if (this.props.rating === null) {
      this.props.onRead(this.state.rating);
    }
    this.setState({
      message: "You saved the rating to " + this.state.rating + ".",
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
    ).then(res => res.json())
    .then(result => {
      this.props.onUpdate(result);
      // this.setState({
      //   things: result,
      // }).then(console.log(this.state.things));
    })
  }

  render() {
    return (
      <div className="rating">
        <form onSubmit={this.handleSubmit}>
          <label>Rate: </label>
          <input
            type="radio"
            name="pain"
            value="1"
            defaultChecked={this.props.rating === 1}
            onChange={this.handleChange}
          />
          1
          <input
            type="radio"
            name="pain"
            value="2"
            defaultChecked={this.props.rating === 2}
            onChange={this.handleChange}
          />
          2
          <input
            type="radio"
            name="pain"
            value="3"
            defaultChecked={this.props.rating === 3}
            onChange={this.handleChange}
          />
          3
          <input
            type="radio"
            name="pain"
            value="4"
            defaultChecked={this.props.rating === 4}
            onChange={this.handleChange}
          />
          4
          <input
            type="radio"
            name="pain"
            value="5"
            defaultChecked={this.props.rating === 5}
            onChange={this.handleChange}
          />
          5<Button colored>Save</Button>
        </form>
        <br />
        <Chip style={this.state.style}>{this.state.message}</Chip> <br />
        <br />
      </div>
    );
  }
}

export default Rating;
