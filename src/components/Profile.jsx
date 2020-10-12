import React, { Component } from "react";
import axios from "axios";
import { Redirect } from "react-router-dom";

const initialState = { user: "", loading: false };

const API_URL = "http://127.0.0.1:8000/rest-auth";

const token = localStorage.getItem("token");

class Profile extends Component {
  constructor(props) {
    super(props);
    this.state = initialState;
  }

  async componentDidMount() {
    if (token !== null) {
      this.setState({ ...this.state, loading: true });
      await axios
        .get(API_URL + "/user/", {
          headers: { Authorization: `Token ${localStorage.getItem("token")}` },
        })
        .then((resp) => {
          this.setState({ user: resp.data, loading: false });
          console.log(this.state);
        })
        .catch((err) => {
          console.log(err);
          this.setState({ ...this.state, loading: false });
        });
    } else {
      this.setState({ ...initialState });
    }
  }

  render() {
    const { loading, user } = this.state;

    if (token === null) {
      return <Redirect to="/login" />;
    }
    return (
      <>
        <div
          className="d-flex flex-column justify-content-center align-items-center text-white"
          style={{ height: "100vh" }}>
          {loading ? (
            <div className="spinner-border spinner-border-sm">
              <span className="sr-only">loading...</span>
            </div>
          ) : (
            <div>
              {/* <h1>Firstname Lastname</h1> */}
              <h2>Username: {user.username}</h2>
              <h3>Email: {user.email}</h3>
            </div>
          )}
        </div>
      </>
    );
  }
}

export default Profile;
