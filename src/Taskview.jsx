import React from 'react'

class Taskview extends React.Component {
  constructor() {
    super();
    this.state = {
      error: null,
      isLoaded: false,
      thing: null,
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

  render() {
    const { error, isLoaded, thing } = this.state;


    if (error) {
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
Created At: {thing.createdAt.substring(0, 9)}
</li>
<li>
Updated At: {thing.updatedAt.substring(0, 9)}
</li>
</ul>



        <hr />


        </div>

      );
    }
  }

}

export default Taskview;
