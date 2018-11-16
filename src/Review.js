import React, { Component } from "react";
import Rating from "./Rating";
import {
  Icon,
  Spinner,
  CardTitle,
  CardText,
  CardActions,
  Card
} from "react-mdl";
import "./style/task.css";

class Review extends Component {
  constructor(props) {
    super(props);
    this.state = {
      error: null,
      isLoaded: false,
      things: props.things,
      unrated: props.things.filter(f => f.rating === null).length
    };
  }

  creatCard = () => {
    var cellRow = [];
    var i,
      j,
      temparray,
      chunk = 3;
    for (i = 0, j = this.state.things.length; i < j; i += chunk) {
      temparray = this.state.things.slice(i, i + chunk);
      const el = temparray.map(thing => (
        <Card
          id="taskcard"
          key={thing._id}
          style={{
            borderRadius: "7px",

          }}
        >
          <CardTitle expand style={{ color: '#00A1FB', background: '#FFFFFF'}}>
            <Icon name="assignment" style={{ marginRight: "9px" }} />
            {thing.title.length >= 30
              ? thing.title.substring(0, 30) + "..."
              : thing.title}
          </CardTitle>
          <CardText
            style={{
              color: "#2F494F",
              background: "#fff",
              textAlign: "left",
              height: "120px"
            }}
          >
            {thing.content.length >= 290
              ? thing.content.substring(0, 290) + "..."
              : thing.content}
          </CardText>
          <CardActions>
            <Rating
              name={thing.title}
              rating={thing.rating}
              id={thing._id}
              title={thing.title}
              content={thing.content}
              onUpdate={this.props.onUpdate}
              onRead={this.props.onRead}
            />
          </CardActions>
        </Card>
      ));
      cellRow.push(el);
    }
    return cellRow;
  };

  componentWillUnmount() {
    this.setState({
      things: [],
      unrated: 0
    });
  }

  componentDidMount() {
    fetch("https://floating-bastion-48526.herokuapp.com/api/tasks")
      .then(res => res.json())
      .then(
        result => {
          this.setState({
            isLoaded: true,
            things: result,
            unrated: result.filter(thing => thing.rating === null).length
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

  render() {
    const { error, isLoaded } = this.state;

    if (error) {
      return <div>Error: {error.message}</div>;
    } else if (!isLoaded) {
      return (
        <div style={{ margin: "300px auto", width: "200px" }}>
          <Spinner />
        </div>
      );
    } else {
      return (
        <div
          className="feedback"
          style={{ padding: "20px", marginLeft: "12px" }}
        >
          <div style={{ marginTop: "30px" }}>{this.creatCard()}</div>
        </div>
      );
    }
  }
}

export default Review;
