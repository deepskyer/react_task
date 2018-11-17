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
      if (this.props.location.state === undefined) {
        temparray = this.state.things
          .sort((a, b) => a.rating - b.rating)
          .slice(i, i + chunk);
      } else {
        temparray = [
          this.props.location.state.thing,
          ...this.state.things.filter(
            t => t._id !== this.props.location.state.thing._id
          )
        ].slice(i, i + chunk);
      }
      const el = temparray.map(thing => (
        <Card
          id="taskcard"
          key={thing._id}
          style={{
            borderRadius: "7px",
            marginLeft: "0px",
            marginRight: "18px"
          }}
        >
          <CardTitle
            expand
            style={{
              color: "#00A1FB",
              background: "#FFFFFF"
            }}
          >
            <Icon name="assignment" style={{ marginRight: "9px" }} />
            {thing.title.length >= 30
              ? thing.title.substring(0, 30) + "..."
              : thing.title}
          </CardTitle>
          <span
            style={{
              color: "#C0C0C0",
              textAlign: "left",
              paddingLeft: "18px",
              fontSize: "12px",
              textTransform: "uppercase"
            }}
          >
            Last Update: {thing.updatedAt.substring(0, 10)}
          </span>
          <CardText
            style={{
              color: "#2F494F",
              background: "#fff",
              textAlign: "left",
              height: "120px",
              paddingLeft: "18px"
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
          style={{
            margin: "30px auto",
            maxWidth: "80%",
            textAlign: "center"
          }}
        >
          {this.creatCard()}
        </div>
      );
    }
  }
}

export default Review;
