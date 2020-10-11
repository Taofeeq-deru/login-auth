import React, { Component } from "react";
import { validateFields } from "../validation";

const initialState = {
  firstname: {
    value: "",
    validateOnChange: true,
    error: "",
  },
  lastname: {
    value: "",
    validateOnChange: true,
    error: "",
  },
  username: {
    value: "",
    validateOnChange: true,
    error: "",
  },
  email: {
    value: "",
    validateOnChange: true,
    error: "",
  },
  password1: {
    value: "",
    validateOnChange: true,
    error: "",
  },
  password2: {
    value: "",
    validateOnChange: true,
    error: "",
  },
  submitCalled: false,
  allFieldsValidated: false,
};

class Signup extends Component {
  constructor(props) {
    super(props);
    this.state = initialState;
  }

  render() {
    const {
      firstname,
      lastname,
      username,
      email,
      password1,
      password2,
      allFieldsValidated,
    } = this.state;

    return (
      <>
        <div
          className="bg-dark d-flex justify-content-center align-items-center"
          style={{ height: "100vh" }}>
          <div
            className="form shadow rounded bg-white p-3"
            style={{ width: "320px" }}>
            <h1 className="mb-3">Sign Up</h1>
            <div>
              {allFieldsValidated && (
                <p className="text-success text-center">All fields validated</p>
              )}
            </div>
            {/**form starts here */}
            <form onSubmit={(e) => this.handleSubmit(e)} className="w-100">
              <div className="form-group">
                <label htmlFor="firstname" className="sr-only">
                  First Name
                </label>
                <input
                  type="text"
                  name="firstname"
                  id="firstname"
                  placeholder="Enter First Name"
                  className={`form-control ${
                    firstname.error === false
                      ? "is-valid"
                      : firstname.error
                      ? "is-invalid"
                      : ""
                  }`}
                  onChange={(e) =>
                    this.handleChange(validateFields.validateFirstname, e)
                  }
                  onBlur={(e) =>
                    this.handleBlur(validateFields.validateFirstname, e)
                  }
                />
                <div className="invalid-feedback">{firstname.error}</div>
              </div>
              <div className="form-group">
                <label htmlFor="lastname" className="sr-only">
                  Last Name
                </label>
                <input
                  type="text"
                  name="lastname"
                  id="lastname"
                  placeholder="Enter Last Name"
                  className={`form-control ${
                    lastname.error === false
                      ? "is-valid"
                      : lastname.error
                      ? "is-invalid"
                      : ""
                  }`}
                  onChange={(e) =>
                    this.handleChange(validateFields.validateLastname, e)
                  }
                  onBlur={(e) =>
                    this.handleBlur(validateFields.validateLastname, e)
                  }
                />
                <div className="invalid-feedback">{lastname.error}</div>
              </div>
              <div className="form-group">
                <label htmlFor="username" className="sr-only">
                  Username
                </label>
                <input
                  type="text"
                  name="username"
                  id="username"
                  placeholder="Enter Userame"
                  className={`form-control ${
                    username.error === false
                      ? "is-valid"
                      : username.error
                      ? "is-invalid"
                      : ""
                  }`}
                  onChange={(e) =>
                    this.handleChange(validateFields.validateUsername, e)
                  }
                  onBlur={(e) =>
                    this.handleBlur(validateFields.validateUsername, e)
                  }
                />
                <div className="invalid-feedback">{username.error}</div>
              </div>
              <div className="form-group">
                <label htmlFor="email" className="sr-only">
                  Email
                </label>
                <input
                  type="text"
                  name="email"
                  id="email"
                  placeholder="Enter Email"
                  className={`form-control ${
                    email.error === false
                      ? "is-valid"
                      : email.error
                      ? "is-invalid"
                      : ""
                  }`}
                  onChange={(e) =>
                    this.handleChange(validateFields.validateEmail, e)
                  }
                  onBlur={(e) =>
                    this.handleBlur(validateFields.validateEmail, e)
                  }
                />
                <div className="invalid-feedback">{email.error}</div>
              </div>
              <div className="form-group">
                <label htmlFor="password1" className="sr-only">
                  Password
                </label>
                <input
                  type="text"
                  name="password1"
                  id="password1"
                  placeholder="Enter Password"
                  className={`form-control ${
                    password1.error === false
                      ? "is-valid"
                      : password1.error
                      ? "is-invalid"
                      : ""
                  }`}
                  onChange={(e) =>
                    this.handlePasswordChange(
                      validateFields.validateSignupPassword,
                      e
                    )
                  }
                  onBlur={(e) =>
                    this.handlePasswordBlur(
                      validateFields.validateSignupPassword,
                      e
                    )
                  }
                />
                <div className="invalid-feedback">{password1.error}</div>
              </div>
              <div className="form-group">
                <label htmlFor="password2" className="sr-only">
                  Confirm Password
                </label>
                <input
                  type="text"
                  name="password2"
                  id="password2"
                  placeholder="Confirm Password"
                  className={`form-control ${
                    password2.error === false
                      ? "is-valid"
                      : password2.error
                      ? "is-invalid"
                      : ""
                  }`}
                  onChange={(e) =>
                    this.handlePasswordChange(
                      validateFields.validateSignupPassword,
                      e
                    )
                  }
                  onBlur={(e) =>
                    this.handlePasswordBlur(
                      validateFields.validateSignupPassword,
                      e
                    )
                  }
                />
                <div className="invalid-feedback">{password2.error}</div>
              </div>
              <div className="form-group">
                <button
                  type="submit"
                  className="btn btn-primary form-control"
                  onMouseDown={() => this.setState({ submitCalled: true })}
                  disabled={
                    firstname.error ||
                    lastname.error ||
                    username.error ||
                    email.error ||
                    password1.error ||
                    password2.error
                      ? true
                      : firstname.error === false &&
                        lastname.error === false &&
                        username.error === false &&
                        email.error === false &&
                        password1.error === false &&
                        password2.error === false
                      ? false
                      : false
                  }>
                  Sign Up
                </button>
              </div>
            </form>
          </div>
        </div>
      </>
    );
  }
}

export default Signup;