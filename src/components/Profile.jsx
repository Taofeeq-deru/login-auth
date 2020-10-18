import React, { Component } from "react";
//import { UpdateProfile } from "./index";
import axios from "axios";
import { Redirect } from "react-router-dom";

const initialState = { user: "", loading: false, isLoggedIn: "" };

const API_URL = "http://127.0.0.1:8000/rest-auth";

class Profile extends Component {
  constructor(props) {
    super(props);
    this.state = initialState;
  }

  async componentDidMount() {
    const token = localStorage.getItem("token");
    this.setState({ ...this.state, loading: true });
    if (token === null) {
      console.log("please login");
      this.setState({ ...initialState, isLoggedIn: false });
      return;
    }
    await axios
      .get(API_URL + "/user/", {
        headers: { Authorization: `Token ${localStorage.getItem("token")}` },
      })
      .then((resp) => {
        this.setState({ user: resp.data, loading: false, isLoggedIn: true });
        console.log(this.state);
      })
      .catch((err) => {
        console.log(err);
        this.setState({ ...this.state, loading: false });
      });
  }

  render() {
    const { loading, user, isLoggedIn } = this.state;

    //    window.location.reload();

    if (isLoggedIn === false) {
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
            <div className="d-flex flex-column align-items-center">
              <h1 className="text-capitalize">
                {user.first_name} {user.last_name}
              </h1>
              <h2>{user.username}</h2>
              <h3>{user.email}</h3>

              {/**
              <button
                type="button"
                className="btn btn-primary mt-3"
                data-toggle="modal"
                data-target="#updateProfile">
                Update Profile
              </button>
              update profile modal
              <div
                className="modal fade"
                id="updateProfile"
                tabIndex="-1"
                aria-labelledby="updateProfileLabel"
                aria-hidden="true">
                <div className="modal-dialog modal-dialog-centered">
                  <div className="modal-content">
                    <div className="modal-header">
                      <h5
                        className="modal-title text-dark"
                        id="updateProfileLabel">
                        Update Profile
                      </h5>
                      <button
                        type="button"
                        className="close"
                        data-dismiss="modal"
                        aria-label="Close">
                        <span aria-hidden="true">&times;</span>
                      </button>
                    </div>
                    <div className="modal-body">
                      <UpdateProfile />
                    </div>
                  </div>
                </div>
              </div>
               */}
            </div>
          )}
        </div>
      </>
    );
  }
}

export default Profile;
