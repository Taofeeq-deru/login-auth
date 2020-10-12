import React, { Component } from "react";

class Home extends Component {
  state = {};
  render() {
    return (
      <>
        <div
          className="d-flex justify-content-center align-items-center"
          style={{ height: "100vh" }}>
          <h1 className="text-white">Welcome</h1>
        </div>
      </>
    );
  }
}

export default Home;
