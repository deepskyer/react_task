import React, { Component } from "react";
import { Redirect } from "react-router-dom";
import { Button, CardActions, Textfield } from "react-mdl";

class Edit extends Component {
  render() {
    const { toTasklist, onAdd, onTitleChange, onContentChange } = this.props;

    if (toTasklist === true) {
      return <Redirect to="/tasks" />;
    }

    return (
      <div>
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
      </div>
    );
  }
}

export default Edit;
