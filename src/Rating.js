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
          ? ""
          : this.props.rating === 2
          ? ""
          : this.props.rating === 3
          ? ""
          : "Not started yet.",
      title: this.props.title,
      content: this.props.content,
      toTasklist: false,
      style: { border: "0px solid #6873D0", backgroundColor: "#FFF", color: "#6873D0"  }
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  componentDidMount() {
    if (this.props.rating === null || this.props.rating === "") {
      this.setState({
        style: { backgroundColor: "#FFF", border: "1px solid #FF7377", color: "#FF7377" }
      });
    }
  }

  handleChange(event) {
    this.setState({
      rating: event.target.value,
      style: { border: "1px solid #9168D0", backgroundColor: "#FFF", color: "#9168D0"  },
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
      style: { backgroundColor: "#FFF", border: "1px solid #68D091", color: "#68D091" }
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
      <Chip style={this.state.style}>{this.state.message}</Chip> <br />
        <br />
        <label className="container">BEGIN
        <input
          type="radio"
          name="status"
          value="1"
          defaultChecked={this.props.rating === 1}
          onChange={this.handleChange}
        />
         <span className="checkmark" style={{marginLeft: "10px"}}/>
         </label>
           <label className="container">WIP
        <input
          type="radio"
          name="status"
          value="2"
          defaultChecked={this.props.rating === 2}
          onChange={this.handleChange}
        />
         <span className="checkmark" style={{marginLeft: "10px"}}/>
         </label>
         <label className="container">DONE
        <input
          type="radio"
          name="status"
          value="3"
          defaultChecked={this.props.rating === 3}
          onChange={this.handleChange}
        />
        <span className="checkmark" style={{marginLeft: "10px"}}/>
        </label>
        <br/>
    <Button id="save" style={{marginTop: "20px"}}>Save</Button>
      </form>

      </div>
    );
  }
}

export default Rating;
