import React, { Component } from 'react';
import {Redirect} from 'react-router-dom';
import {Button, CardActions, Textfield} from 'react-mdl';

class Edit extends Component {

  render() {

    const {toTasklist, onAdd, onTitleChange, onContentChange} = this.props;

    if (toTasklist === true) {
      return <Redirect to='/tasks'/>
    }

    return (
      <div>
          <form>
          <Textfield
          onChange={onTitleChange}
          label="Task Name"
          style={{width: '200px'}}
          />
          <br />
                  <Textfield onChange={onContentChange}
                  label="Task Content"
                  rows={3}
                  style={{width: '200px'}}
                  />
              <br />
              <CardActions>
                 <Button raised colored onClick={onAdd}>Add</Button>
              </CardActions>
              <br />
          </form>
      </div>
    );

  }

}

export default Edit;
