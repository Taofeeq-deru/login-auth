import React, { Component } from "react";
import { validateFields } from "validator";

const initialState = {
  email: {
    value: "",
    validateOnChange: false,
    error: "",
  },
  password: {
    value: "",
    validateOnChange: false,
    error: "",
  },
  submitCalled: false,
  allFieldsValidated: false,
};

class Login extends Component {
  constructor(props) {
    super(props);
    this.state = initialState;
  }

  render() {
    const { email, password, allFieldsValidated } = this.state;
    return (
      <>
        <div
          className="bg-dark d-flex justify-content-center align-items-center"
          style={{ height: "100vh" }}>
          <div
            className="form border border-white rounded p-3 bg-white"
            style={{ width: "320px" }}>
            <h1 className="mb-3">Log In</h1>
            <div>
              {allFieldsValidated && (
                <p className="text-success text-center">All fields validated</p>
              )}
            </div>
            {/**form starts here */}
            <form onSubmit={(e) => this.handleSubmit(e)} className="w-100">
              <div className="form-group">
                <label htmlFor="email" className="sr-only">
                  Email
                </label>
                <input
                  type="email"
                  name="email"
                  id="email"
                  value={email.value}
                  className={`form-control ${
                    email.error === false
                      ? "is-valid"
                      : email.error
                      ? "is-invalid"
                      : ""
                  }`}
                  placeholder="Enter Email"
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
                <label htmlFor="password" className="sr-only">
                  Password
                </label>
                <input
                  type="password"
                  name="password"
                  id="password"
                  value={password.value}
                  className={`form-control ${
                    password.error === false
                      ? "is-valid"
                      : password.error
                      ? "is-invalid"
                      : ""
                  }`}
                  placeholder="Enter Password "
                  onChange={(e) =>
                    this.handleChange(validateFields.validatePassword, e)
                  }
                  onBlur={(e) =>
                    this.handleBlur(validateFields.validatePassword, e)
                  }
                />
                <div className="invalid-feedback">{password.error}</div>
              </div>
              <div className="form-group">
                <button
                  type="submit"
                  className="btn btn-primary form-control"
                  onMouseDown={() => this.setState({ submitCalled: true })}>
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
