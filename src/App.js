import React, { Component } from "react";
import "./App.css";
import Form from "./components/form.jsx";
import AllUsers from "./components/allUsers.jsx";
import { BrowserRouter as Router, Route, Link } from "react-router-dom";

function NewUser(props) {
  return <h3>User Inserted! {JSON.stringify(props.userObj)}</h3>;
}
function NewExercise(props) {
  return <h3>Exercise Added! {JSON.stringify(props.exerciseObj)}</h3>;
}

function ExerciseLog(props) {
  return <h5>{JSON.stringify(props.exerciseLogObj)}</h5>;
}

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      userObj: {},
      exerciseObj: {},
      exerciseLogObj: []
    };
  }
  setUserObj = user => {
    this.setState({
      userObj: user
    });
  };
  setExerciseObj = exercise => {
    this.setState({
      exerciseObj: exercise
    });
  };
  setExerciseLogObj = exercise => {
    this.setState({
      exerciseLogObj: exercise
    });
  };
  render() {
    return (
      <div>
        <Router>
          <div>
            <nav className="navbar navbar-expand-lg navbar-light bg-light">
              <a className="navbar-brand" href="#">
                User-Stories
              </a>
              <button
                className="navbar-toggler"
                type="button"
                data-toggle="collapse"
                data-target="#navbarNavAltMarkup"
                aria-controls="navbarNavAltMarkup"
                aria-expanded="false"
                aria-label="Toggle navigation"
              >
                <span className="navbar-toggler-icon" />
              </button>
              <div className="collapse navbar-collapse" id="navbarNavAltMarkup">
                <div className="navbar-nav">
                  <Link className="nav-item nav-link" to="/">
                    Home
                  </Link>
                  <Link className="nav-item nav-link" to="/api/exercise/users/">
                    All Users
                  </Link>
                </div>
              </div>
            </nav>

            <Route
              path="/"
              exact
              render={props => (
                <Form
                  {...props}
                  setUserObj={this.setUserObj}
                  setExerciseObj={this.setExerciseObj}
                  setExerciseLogObj={this.setExerciseLogObj}
                />
              )}
            />
            <Route path="/api/exercise/users/" component={AllUsers} />
            <Route
              path="/api/exercise/new-user/"
              render={props => <NewUser userObj={this.state.userObj} />}
            />
            <Route
              path="/api/exercise/add/"
              render={props => (
                <NewExercise exerciseObj={this.state.exerciseObj} />
              )}
            />
            <Route
              path="/api/exercise/log/"
              render={props => (
                <ExerciseLog exerciseLogObj={this.state.exerciseLogObj} />
              )}
            />
          </div>
        </Router>
      </div>
    );
  }
}

export default App;
