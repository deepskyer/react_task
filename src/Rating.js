import React from 'react';
import {Button, Chip} from 'react-mdl';
import './style/rating.css';

class Rating extends React.Component {

  constructor(props) {
      super(props);
      this.state = {
        rating: "",
        message: this.props.rating?"rated:" + this.props.rating : "not rate yet",
        title: this.props.title,
        content:this.props.content,
        toTasklist: false,
      };
      this.handleChange = this.handleChange.bind(this);
      this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleChange(event){
      this.setState({
        rating: event.target.value,
        message: "Please save your rating",
      });
      console.log(event.target.value);
    }

     handleSubmit(event) {
        event.preventDefault();
        this.setState({
          message: "Rated:  " + this.state.rating,
        });
        console.log("you rate " + this.state.rating + " for this task.");
        fetch('https://floating-bastion-48526.herokuapp.com/api/tasks/'+this.props.id, {
      method: 'PUT',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        title: this.state.title,
        content: this.state.content,
        rating: this.state.rating
      })
    });
      }


  render() {
    return (
<div className="rating">
      <form onSubmit={this.handleSubmit}>
      <label>Rate: </label>
          <input type="radio" name="pain" value="1" defaultChecked={this.props.rating === 1} onChange={this.handleChange}/>1
          <input type="radio" name="pain" value="2" defaultChecked={this.props.rating === 2} onChange={this.handleChange}/>2
          <input type="radio" name="pain" value="3" defaultChecked={this.props.rating === 3} onChange={this.handleChange}/>3
          <input type="radio" name="pain" value="4" defaultChecked={this.props.rating === 4} onChange={this.handleChange}/>4
          <input type="radio" name="pain" value="5" defaultChecked={this.props.rating === 5} onChange={this.handleChange}/>5


          <Button colored>Save</Button>
      </form>

<Chip>{this.state.message}</Chip> <br/>

    <br/>
</div>
    );



  }

}

export default Rating;
