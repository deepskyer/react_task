import React, { Component } from "react";
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import "./style/App.css";
import Task from "./Task";
import Statistic from "./statistic";
import Review from "./Review";
import { Drawer, Icon, Badge, Layout, Header, Navigation } from "react-mdl";
import CreateNew from "./newTask";
import Taskview from "./Taskview";

class App extends Component {
  constructor() {
    super();
    this.state = {
      error: null,
      unrated: null,
      title: null,
      content: null,
      toTasklist: false,
      isLoaded: false,
      things: []
    };
  }

  onRead = () => {
    this.setState({ unrated: this.state.unrated - 1 });
  };

  updateRating = (item) => {
    const remain = this.state.things.filter(t => t._id !== item._id);
    this.setState({things: [...remain, item]})
  }

  handleDirect = event => {
    this.setState({ toTasklist: false });
  };

  handleDelete = thing => {
    if (thing.rating === null) {
      this.onRead();
    }

    const things = this.state.things.filter(t => t._id !== thing._id);
    this.setState({
      toTasklist: true,
      things: things
    });
    fetch(
      "https://floating-bastion-48526.herokuapp.com/api/tasks/" + thing._id,
      {
        method: "DELETE"
      }
    );
  };

  handleAdd = event => {
    event.preventDefault();
    fetch("https://floating-bastion-48526.herokuapp.com/api/tasks/", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        title: this.state.title,
        content: this.state.content
      })
    })
      .then(res => res.json())
      .then(result => {
        const things = [...this.state.things, result];
        this.setState({
          isLoaded: true,
          things: things,
          unrated: things.filter(thing => thing.rating === null).length,
          toTasklist: true,
        });
      });
  };

  handleTitleChange = event => {
    this.setState({ title: event.target.value });
  };

  handleContentChange = event => {
    this.setState({ content: event.target.value });
  };

  componentWillUnmount() {
    this.setState({ toTasklist: false });
  }

  componentDidMount() {
    fetch("https://floating-bastion-48526.herokuapp.com/api/tasks")
      .then(res => res.json())
      .then(
        result => {
          this.setState({
            isLoaded: true,
            things: result,
            unrated: result.filter(thing => thing.rating === null).length
          });
        },
        error => {
          this.setState({
            isLoaded: true,
            error
          });
        }
      );
  }

  render() {
    const {
      error,
      isLoaded,
      unrated,
      toTasklist,
      things,
      title,
      content
    } = this.state;

    return (
      <Router>
        <div className="Nav">
          <Layout>
            <Header
              title="{ Tasks Tracker }"
              style={{ color: "#fff", background: "#1e2c39" }}
              scroll
            >
              <Navigation>
                <Link to="/">Home</Link>
                <Link to="/create">Create</Link>
                <Link to="/review">
                  <Badge
                    text={
                      this.state.unrated === null || this.state.unrated === 0
                        ? null
                        : this.state.unrated
                    }
                  >
                    Update Status
                  </Badge>
                </Link>
                <Link to="/statistic">
                  <Icon name="assessment" style={{ marginRight: 10 }} />
                  Statistic
                </Link>
              </Navigation>
            </Header>

            <Drawer title="{ Tasks Tracker }">
              <Navigation>
                <Link to="/">Home</Link>
                <Link to="/create">Create</Link>
                <Link to="/review">
                  <Badge
                    text={
                      this.state.unrated === null || this.state.unrated === 0
                        ? null
                        : this.state.unrated
                    }
                  >
                    Update
                  </Badge>
                </Link>
                <Link to="/statistic">Statistic</Link>
              </Navigation>
            </Drawer>

            <Route
              exact
              path="/"
              render={props => (
                <Task
                  {...props}
                  error={error}
                  isLoaded={isLoaded}
                  things={things}
                  toTasklist={toTasklist}
                  nodirect={this.handleDirect}
                />
              )}
            />

            <Route
              path="/create"
              render={props => (
                <CreateNew
                  {...props}
                  error={error}
                  isLoaded={isLoaded}
                  title={title}
                  content={content}
                  things={things}
                  toTasklist={toTasklist}
                  onAdd={this.handleAdd}
                  onTitleChange={this.handleTitleChange}
                  onContentChange={this.handleContentChange}
                />
              )}
            />

            <Route
              path="/review"
              render={props => (
                <Review
                  {...props}
                  unrated={unrated}
                  things={things}
                  onRead={this.onRead}
                  onUpdate ={this.updateRating}
                />
              )}
            />

            <Route path="/statistic" component={Statistic} />

            <Route
              path="/task/:id"
              render={props => (
                <Taskview
                  {...props}
                  onDelete={this.handleDelete}
                  things={things}
                  toTasklist={toTasklist}
                />
              )}
            />
          </Layout>
        </div>
      </Router>
    );
  }
}

export default App;
