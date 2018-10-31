import React from 'react';
import {Redirect} from 'react-router-dom';

class Taskview extends React.Component {
  constructor() {
    super();
    this.state = {
      error: null,
      isLoaded: false,
      thing: null,
      toTasklist: false,
    };
  }



  componentDidMount() {

    let url='https://floating-bastion-48526.herokuapp.com/api/tasks/'+this.props.match.params.id;

    fetch(url)
      .then(res => res.json())
      .then(
        (result) => {
          this.setState({
            isLoaded: true,
            thing: result,
          });

        },

        (error) => {
          this.setState({
            isLoaded: true,
            error
          });
        },

      )
  }

  deleteHandler=(event)=> {
  console.log("delete");
  fetch('https://floating-bastion-48526.herokuapp.com/api/tasks/'+this.state.thing._id, {
  			method: 'DELETE'
  		});
      this.setState({
        toTasklist: true,
      });
  }

  render() {
    const { error, isLoaded, thing, toTasklist} = this.state;

if(toTasklist){return <Redirect to='/tasks' />}
    else if (error) {
      return <div>Error: {error.message}</div>;
    } else if (!isLoaded) {
      return <div>Loading...</div>;
    } else {

      return (
        <div className="task">

        <h4>This is the detail of the task</h4>
<ul>
<li>
Title: {thing.title}
</li>
<li>
Content: {thing.content}
</li>
<li>
Created At: {thing.createdAt.substring(0, 10)}
</li>
<li>
Updated At: {thing.updatedAt.substring(0, 10)}
</li>
</ul>

<button onClick={this.deleteHandler}>Delete</button>


        <hr />


        </div>

      );
    }
  }

}

export default Taskview;
