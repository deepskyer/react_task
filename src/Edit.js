import React, { Component } from 'react';
import {withRouter} from 'react-router-dom';

class Edit extends Component {
  constructor(props) {
    super(props);
    this.state = {
      title: null,
      content:null

    } ;
    this.clickhandler = this.clickhandler.bind(this);
    this.handleTitleChange = this.handleTitleChange.bind(this);
    this.handleContentChange = this.handleContentChange.bind(this);
  }

  clickhandler= (event) => {
    event.preventDefault();
    console.log(this.state.title+this.state.content);
    fetch('https://floating-bastion-48526.herokuapp.com/api/tasks/', {
  method: 'POST',
  headers: {
    'Accept': 'application/json',
    'Content-Type': 'application/json',
  },
  body: JSON.stringify({
    title: this.state.title,
    content: this.state.content,
  })
})

this.props.history.push('/tasks');
  }

  handleTitleChange(event) {
   this.setState({title: event.target.value});
}
handleContentChange(event) {
   this.setState({content: event.target.value});
}

  render() {
    return (
      <div>
          <form>
                <label>
                  Title
                  <input onChange={this.handleTitleChange}/>
                </label>
                <br />
                <label>
                  Content
                  <input type="text" style={{width: "370px"}} onChange={this.handleContentChange}/>
                </label>
              <br />
            <button onClick={this.clickhandler}>Submit</button>
          </form>
      </div>
    );
  }

}

export default withRouter(Edit);
