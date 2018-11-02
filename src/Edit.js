import React, { Component } from 'react';
import {Redirect} from 'react-router-dom';
import {CardActions, Textfield} from 'react-mdl';
import Button from '@material-ui/core/Button';

class Edit extends Component {
  constructor(props) {
    super(props);
    this.state = {
      title: null,
      content:null,
      toTasklist: false,
    } ;
    this.clickhandler = this.clickhandler.bind(this);
    this.handleTitleChange = this.handleTitleChange.bind(this);
    this.handleContentChange = this.handleContentChange.bind(this);
  }



  clickhandler= (event) => {
            event.preventDefault();
            console.log(this.state.title+this.state.content);
            fetch('https://floating-bastion-48526.herokuapp.com/api/tasks/',  {
                method: 'POST',
                headers: {
                  'Accept': 'application/json',
                  'Content-Type': 'application/json',
                },
          body: JSON.stringify({
            title: this.state.title,
            content: this.state.content,
          })
        });
          this.setState({toTasklist: true});
  }



  handleTitleChange(event) {
   this.setState({title: event.target.value});
}

handleContentChange(event) {
   this.setState({content: event.target.value});
}



  render() {
    if (this.state.toTasklist === true) {
      return <Redirect to='/tasks' />
    }

    return (
      <div>
          <form>
          <Textfield
          onChange={this.handleTitleChange}
          label="Task Name"
          style={{width: '200px'}}
          />
          <br />
                  <Textfield onChange={this.handleContentChange}
                  label="Task Content"
                  rows={1}
                  style={{width: '350px'}}
                  />
              <br />
              <CardActions>
                 <Button variant="contained" color="primary" onClick={this.clickhandler}>Add</Button>
              </CardActions>
              <br />
          </form>
      </div>
    );

  }

}

export default Edit;
