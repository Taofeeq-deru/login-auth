import React, { Component } from "react";
import { Link, withRouter } from "react-router-dom";

class Nav extends Component {
  state = {};
  render() {
    const { location } = this.props;
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
        </nav>
      </>
    );
  }
}

export default withRouter(Nav);
