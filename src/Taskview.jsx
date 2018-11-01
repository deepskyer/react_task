import React from 'react';
import {Redirect} from 'react-router-dom';
import {Button} from 'react-mdl';

class Taskview extends React.Component {
  constructor() {
    super();
    this.state = {
      error: null,
      isLoaded: false,
      thing: null,
      toTasklist: false,
      toReview: false
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

  reviewHandler=(event)=>{
    this.setState({
      toReview: true,
    });
  }

  render() {
    const { error, isLoaded, thing, toTasklist, toReview} = this.state;

if(toTasklist){return <Redirect to='/tasks' />}
else if (toReview) {return <Redirect to='/feedback' />}
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
Rating: {thing.rating}
</li>
<li>
Created At: {thing.createdAt.substring(0, 10)}
</li>
<li>
Updated At: {thing.updatedAt.substring(0, 10)}
</li>
</ul>


        <hr />

<Button onClick={this.deleteHandler} raised ripple accent>Delete</Button>  <Button onClick={this.reviewHandler} raised colored ripple>Review</Button>




        </div>

      );
    }
  }

}

export default Taskview;
