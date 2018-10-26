import React from 'react'

class Rating extends React.Component {

  constructor(props) {
      super(props);
      this.state = {rating: "", message: "not rate yet"};
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
          message: "you rate " + this.state.rating + " for this task.",
        });
        console.log("you rate " + this.state.rating + " for this task.");
      }


  render() {
    return (
<div>
      <form onSubmit={this.handleSubmit}>
      <label>Please rate the task {this.props.name}. </label>
          <input type="radio" name="pain" value="1" onChange={this.handleChange}/>1
          <input type="radio" name="pain" value="2" onChange={this.handleChange}/>2
          <input type="radio" name="pain" value="3" onChange={this.handleChange}/>3
          <input type="radio" name="pain" value="4" onChange={this.handleChange}/>4
          <input type="radio" name="pain" value="5" onChange={this.handleChange}/>5
          <input type="submit" value="Save"/>
      </form>

      <h3>{this.state.message}</h3>
</div>
    );



  }

}

export default Rating;
