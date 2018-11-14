import React, { Component } from "react";
import { Redirect } from "react-router-dom";
import { Button, CardActions, Textfield, CardTitle, Card, CardText } from "react-mdl";
import "./style/Home.css";
import welcomecard from "./img/welcome_card.jpg";

class CreateNew extends Component {
  render() {
    const { toTasklist, onAdd, onTitleChange, onContentChange } = this.props;

    if (toTasklist === true) {
      return <Redirect to="/" />;
    }

    return (

      <div className="welcome">
        <Card shadow={0} style={{ margin: "auto" }}>
          <CardTitle
            style={{
              color: "#fff",
              height: "176px",
              background: `url(${welcomecard}) left / cover`
            }}
          >
            New task
          </CardTitle>
          <CardText>Please add a new task to review.</CardText>
          <form id="task" onSubmit={onAdd}>
            <Textfield
              onChange={onTitleChange}
              label="Task Name"
              style={{ width: "200px" }}
            />
            <br />
            <Textfield
              onChange={onContentChange}
              label="Task Content"
              rows={3}
              style={{ width: "200px" }}
            />
            <br />
          </form>

          <CardActions>
            <Button raised colored type="submit" form="task" value="Submit">
              Add
            </Button>
          </CardActions>
          <br />
        </Card>
      </div>




    );
  }
}

export default CreateNew;
