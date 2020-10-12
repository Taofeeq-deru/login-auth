import React, { Component } from "react";
import axios from "axios";
import { Link, withRouter, Redirect } from "react-router-dom";

const API_URL = "http://127.0.0.1:8000/rest-auth";

class Nav extends Component {
  state = {};

  async handleLogout() {
    await axios.post(API_URL + "/logout/");

    localStorage.removeItem("token");

    return (
      <>
        <Redirect to="/" />
        {window.location.reload()}
      </>
    );
  }

  render() {
    const { location } = this.props;

    const token = localStorage.getItem("token");

    return (
      <>
        <nav className="navbar navbar-expand-lg navbar-light bg-light py-0">
          <Link
            to="/"
            className={`nav-link ${location.pathname === "/" && "active"}`}>
            Home{" "}
            {location.pathname === "/" && (
              <span className="sr-only">(current)</span>
            )}
          </Link>
          <Link
            to="/profile"
            className={`nav-link ${
              location.pathname === "/profile" && "active"
            }`}>
            Profile{" "}
            {location.pathname === "/" && (
              <span className="sr-only">(current)</span>
            )}
          </Link>
          {token === null ? (
            <Link
              to="/login"
              className={`nav-link ${
                location.pathname === "/login" && "active"
              }`}>
              Log In{" "}
              {location.pathname === "/" && (
                <span className="sr-only">(current)</span>
              )}
            </Link>
          ) : (
            <Link to="" className="nav-link" onClick={this.handleLogout}>
              Log Out
            </Link>
          )}
          {token === null && (
            <Link
              to="/signup"
              className={`nav-link ${
                location.pathname === "/signup" && "active"
              }`}>
              Sign Up{" "}
              {location.pathname === "/" && (
                <span className="sr-only">(current)</span>
              )}
            </Link>
          )}
        </nav>
      </>
    );
  }
}

export default withRouter(Nav);
