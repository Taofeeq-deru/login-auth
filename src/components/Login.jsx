import React, { Component } from "react";

class Login extends Component {
  state = {};
  render() {
    return (
      <>
        <div
          className="bg-dark d-flex justify-content-center align-items-center"
          style={{ height: "100vh" }}>
          <div
            className="form border border-white rounded p-3 bg-white"
            style={{ width: "320px" }}>
            <h1 className="mb-3">Log In</h1>
            <form action="" className="w-100">
              <div className="form-group">
                <label htmlFor="email" className="sr-only">
                  Email
                </label>
                <input
                  type="email"
                  name="email"
                  id="email"
                  className="form-control"
                  placeholder="Enter Email"
                />
              </div>
              <div className="form-group">
                <label htmlFor="password" className="sr-only">
                  Password
                </label>
                <input
                  type="password"
                  name="password"
                  id="password"
                  className="form-control"
                  placeholder="Enter Password"
                />
              </div>
              <div className="form-group">
                <button type="submit" className="btn btn-primary form-control">
                  Log In
                </button>
              </div>
            </form>
          </div>
        </div>
      </>
    );
  }
}

export default Login;
