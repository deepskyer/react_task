import React, { Component }  from 'react';
import './style/task.css';

class Taskview extends Component {

  constructor(props) {
    super(props);
    this.state = {
      error: null,
      isLoaded: false,
      thing: null,
    };
  }

  componentDidMount(){
let idcode = this.props.match.params.id;
let url ='https://floating-bastion-48526.herokuapp.com/api/tasks/' + idcode;
fetch(url)
  .then(res => res.json())
  .then(
    (result) => {
      this.setState({
        isLoaded: true,
        thing: result,
      });},

    (error) => {
      this.setState({
        isLoaded: true,
        error
      });
    },

  )

  }


  render() {
    const { error, isLoaded, thing } = this.state;


    if (error) {
      return <div>Error: {error.message}</div>;
    } else if (!isLoaded) {
      return <div>Loading...</div>;
    } else {

      return (
        <div className="task">
        <h4>This is the detail of a task</h4>
        {thing.title}
        </div>


      );
    }
  }




}



export default Taskview;
