import React, { Component } from "react";

class Profile extends Component {
  state = {};
  render() {
    return (
      <>
        <div
          className="d-flex flex-column justify-content-center align-items-center text-white"
          style={{ height: "100vh" }}>
          <h1>Firstname Lastname</h1>
          <h2>Username</h2>
          <h3>Email</h3>
        </div>
      </>
    );
  }
}

export default Profile;
