1. create-react-app.

2. 文件夹public中有一个index.html。这是最后形成的html页面。这个页面中有个div它的id是root。这是react其它元素插入的地方。

3.src文件夹中有一个index.js。这是将react插入index.html root标签处的js方法。这个方法中有个参数是<App/>, 也就是说将App这个component插入index的root标签处

ReactDOM.render(<App/>, document.getElementById('root'))

4. App component.
每个component要引入React和Component模块。
import React, { Component }  from 'react';

每个component可以嵌入自己的css样式。
import './style/App.css';

每个component还可以嵌入其它的component。
import Task from './Task';


建立一个名为App的class extends Component. export 这个class可以供其它地方使用。<App/>

5. Task component using rest api.

import React, { Component }  from 'react';
import './style/task.css';

class Task extends Component {
  constructor() {
    super();
    this.state = {
      error: null,
      isLoaded: false,
      things: []
    };
  }

  componentDidMount() {
    fetch('https://jsonplaceholder.typicode.com/todos/')
      .then(res => res.json())
      .then(
        (result) => {
          this.setState({
            isLoaded: true,
            things: result
          });
        },

        (error) => {
          this.setState({
            isLoaded: true,
            error
          });
        }
      )
  }

  render() {
    const { error, isLoaded, things } = this.state;
    if (error) {
      return <div>Error: {error.message}</div>;
    } else if (!isLoaded) {
      return <div>Loading...</div>;
    } else {
      return (
        <div className="task">
        <h4>This is a task component</h4>
        <ul>
          {things.map(thing => (
            <li key={thing.id}>
              {thing.id}: {thing.title}
            </li>
          ))}
        </ul>
        </div>
      );
    }
  }
}

export default Task;
