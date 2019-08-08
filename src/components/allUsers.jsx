import React, { Component } from "react";
import axios from "axios";

class AllUsers extends Component {
  state = {
    data: [],
    hello: "hello"
  };

  componentDidMount() {
    fetch("http://localhost:12345/users")
      .then(res => res.json())
      .then(data => {
        this.setState({ data: data });
      })
      .catch(console.log);
  }
  render() {
    return (
      <div>
        <table class="table">
          <thead>
            <tr>
              <th scope="col">User ID</th>
              <th scope="col">Username</th>
            </tr>
          </thead>
          <tbody>
            {this.state.data.map(contact => (
              <tr>
                <td>{contact._id}</td>
                <td>{contact.username}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    );
  }
}

export default AllUsers;
