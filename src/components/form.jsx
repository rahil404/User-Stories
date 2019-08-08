import React, { Component } from "react";
import axios from "axios";

class Form extends Component {
  constructor(props) {
    super(props);

    this.state = {
      username: "",
      userid: "",
      description: "",
      duration: "",
      dateE: "",
      dateForLog: "",
      userForLog: "",
      limitForLog: "",
      toDateForLog: "",
      logArr: []
    };
  }

  changeHandler = e => {
    this.setState({ [e.target.name]: e.target.value });
  };

  submitHandler = e => {
    e.preventDefault();
    console.log(this.state);
    let userObj = { username: this.state.username };
    axios
      .post("http://localhost:12345/user", userObj)
      .then(response => {
        response.data.username = this.state.username;
        if (response.data.username) {
          console.log("ccx", response.data);
          this.props.setUserObj(response.data);
          this.props.history.push({
            pathname: "/api/exercise/new-user/",
            state: response.data
          });
        }
      })
      .catch(error => {
        console.log(error);
      });
  };

  submitHandlerE = e => {
    e.preventDefault();
    let d = new Date().toISOString().slice(0, 10);
    let dateEE = this.state.dateE === "" ? d : this.state.dateE;
    let exObj = {
      description: this.state.description,
      duration: this.state.duration,
      date: dateEE,
      user: {
        _id: this.state.userid
      }
    };
    console.log("exObj", exObj);
    axios
      .post("http://localhost:12345/exercise", exObj)
      .then(response => {
        //get username of exercise
        axios
          .get("http://localhost:12345/user/" + this.state.userid)
          .then(response2 => {
            console.log("Response 2 username", response2.data.username);
            response.data.description = this.state.description;
            response.data.duration = this.state.duration;
            response.data.date = dateEE;
            response.data.userID = this.state.userid;
            response.data.username = response2.data.username;
            console.log("E submit resp", response.data);

            this.props.setExerciseObj(response.data);
            this.props.history.push({
              pathname: "/api/exercise/add/",
              state: response.data
            });
          })
          .catch(error => {
            console.log(error);
          });
      })
      .catch(error => {
        console.log(error);
      });
  };

  submitHandlerL = e => {
    e.preventDefault();
    fetch("http://localhost:12345/exercises")
      .then(res => res.json())
      .then(data => {
        this.setState({ logArr: data });
        console.log("Log Array", this.state.logArr);
        let newLogArr = this.state.logArr.filter(
          item => item.user["_id"] === this.state.userForLog
        );

        if (this.state.limitForLog !== "") {
          console.log("Limit not null");
          newLogArr = newLogArr.slice(0, this.state.limitForLog);
        }

        if (this.state.dateForLog !== "" && this.state.toDateForLog !== "") {
          console.log("Date log", this.state.dateForLog);
          console.log("To Date log", this.state.toDateForLog);
          let from = new Date(this.state.dateForLog);
          let to = new Date(this.state.toDateForLog);

          let Arraywithdate = [];

          newLogArr.forEach(item => {
            let check = new Date(item.date);
            if (
              check.getTime() <= to.getTime() &&
              check.getTime() >= from.getTime()
            ) {
              console.log("date contained");
              Arraywithdate.push(item);
            } else {
              console.log("date not contained");
            }
            console.log("New Log Arr date", Arraywithdate);
            this.props.setExerciseLogObj(Arraywithdate);
            this.props.history.push({
              pathname: "/api/exercise/log/",
              state: Arraywithdate
            });
          });
        } else {
          console.log("New Log Arr", newLogArr);
          this.props.setExerciseLogObj(newLogArr);
          this.props.history.push({
            pathname: "/api/exercise/log/",
            state: newLogArr
          });
        }
      })
      .catch(console.log);
  };

  render() {
    const {
      username,
      userid,
      description,
      duration,
      dateE,
      dateForLog,
      userForLog,
      limitForLog,
      toDateForLog
    } = this.state;
    return (
      <div className="container mt-5">
        <div className="row">
          <div
            className="col-3 p-3 mr-4"
            style={{
              backgroundColor: "#b3b3cc",
              borderRadius: 5,
              textAlign: "center"
            }}
          >
            <h3>Create user</h3>
            <form onSubmit={this.submitHandler}>
              <div className="mb-2 mt-2">
                <input
                  className="p-1"
                  style={{
                    borderRadius: 5
                  }}
                  required
                  placeholder="Enter Username*"
                  type="text"
                  name="username"
                  value={username}
                  onChange={this.changeHandler}
                />
              </div>
              <button className="btn btn-sm btn-primary" type="submit">
                Submit
              </button>
            </form>
          </div>

          <div
            className="col-3 p-3 mr-4"
            style={{
              backgroundColor: "skyblue",
              borderRadius: 5,
              textAlign: "center"
            }}
          >
            <h3>Add Exercise</h3>
            <form onSubmit={this.submitHandlerE}>
              <div className="mb-2 mt-2">
                <input
                  className="p-1"
                  style={{
                    borderRadius: 5
                  }}
                  required
                  placeholder="Enter User ID*"
                  type="text"
                  name="userid"
                  value={userid}
                  onChange={this.changeHandler}
                />
              </div>
              <div className="mb-2 mt-2">
                <input
                  className="p-1"
                  style={{
                    borderRadius: 5
                  }}
                  required
                  placeholder="Enter Description*"
                  type="text"
                  name="description"
                  value={description}
                  onChange={this.changeHandler}
                />
              </div>
              <div className="mb-2 mt-2">
                <input
                  className="p-1"
                  style={{
                    borderRadius: 5
                  }}
                  required
                  placeholder="Enter Duration*"
                  type="text"
                  name="duration"
                  value={duration}
                  onChange={this.changeHandler}
                />
              </div>
              <div className="mb-2 mt-2">
                <input
                  className="p-1"
                  style={{
                    borderRadius: 5
                  }}
                  placeholder="Enter Date"
                  type="date"
                  name="dateE"
                  value={dateE}
                  onChange={this.changeHandler}
                />
              </div>
              <button className="btn btn-sm btn-primary" type="submit">
                Submit
              </button>
            </form>
          </div>
          <div
            className="col-3 p-3"
            style={{
              backgroundColor: "#b3b3cc",
              borderRadius: 5,
              textAlign: "center"
            }}
          >
            <h3>Exercise Log</h3>
            <form onSubmit={this.submitHandlerL}>
              <div className="mb-2 mt-2">
                <input
                  className="p-1"
                  style={{
                    borderRadius: 5
                  }}
                  required
                  placeholder="Enter user ID*"
                  type="text"
                  name="userForLog"
                  value={userForLog}
                  onChange={this.changeHandler}
                />
              </div>
              <div className="mb-2 mt-2">
                <input
                  className="p-1"
                  style={{
                    borderRadius: 5
                  }}
                  placeholder="Enter Date"
                  type="date"
                  name="dateForLog"
                  value={dateForLog}
                  onChange={this.changeHandler}
                />
              </div>
              <div className="mb-2 mt-2">
                <input
                  className="p-1"
                  style={{
                    borderRadius: 5
                  }}
                  placeholder="Enter Date"
                  type="date"
                  name="toDateForLog"
                  value={toDateForLog}
                  onChange={this.changeHandler}
                />
              </div>
              <div className="mb-2 mt-2">
                <input
                  className="p-1"
                  style={{
                    borderRadius: 5
                  }}
                  placeholder="Enter Limit"
                  type="number"
                  name="limitForLog"
                  value={limitForLog}
                  onChange={this.changeHandler}
                />
              </div>
              <button className="btn btn-sm btn-primary" type="submit">
                Submit
              </button>
            </form>
          </div>
        </div>
      </div>
    );
  }
}

export default Form;
