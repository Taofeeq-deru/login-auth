import React, { Component } from "react";
import { validateFields } from "../validation";

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
  loading: false,
  error: false,
};

//const API_URL = "http://127.0.0.1:8000/rest-auth";

class Login extends Component {
  constructor(props) {
    super(props);
    this.state = initialState;
  }
  /*
   * validates the field onBlur if sumbit button is not clicked
   * set the validateOnChange to true for that field
   * check for error
   */

  handleBlur(validationFunc, e) {
    const field = e.target.name;
    // validate onBlur only when validateOnChange for that field is false
    // because if validateOnChange is already true there is no need to validate onBlur
    if (
      this.state[field]["validateOnChange"] === false &&
      this.state.submitCalled === false
    ) {
      this.setState((state) => ({
        [field]: {
          ...state[field],
          validateOnChange: true,
          error: validationFunc(state[field].value),
        },
      }));
    }
    return;
  }

  /*
   * update the value in state for that field
   * check for error if validateOnChange is true
   */
  handleChange(validationFunc, e) {
    const field = e.target.name;
    const fieldVal = e.target.value;
    this.setState((state) => ({
      [field]: {
        ...state[field],
        value: fieldVal,
        error: state[field]["validateOnChange"] ? validationFunc(fieldVal) : "",
      },
    }));
  }

  /*
   * validate all fields
   * check if all fields are valid if yes then submit the Form
   * otherwise set errors for the feilds in the state
   */
  async handleSubmit(e) {
    e.preventDefault();
    //validate all fields
    const { email, password } = this.state;
    const emailError = validateFields.validateEmail(email.value);
    const passwordError = validateFields.validatePassword(password.value);
    if ([emailError, passwordError].every((e) => e === false)) {
      ///no errors, submit form
      console.log("success");

      //clear state and show all fields are validated
      this.setState({ ...initialState, allFieldsValidated: true });
      this.showAllFieldsValidated();
    } else {
      //update state with errors
      this.setState((state) => ({
        email: {
          ...state.email,
          validateOnChange: true,
          error: emailError,
        },
        password: {
          ...state.password,
          validateOnChange: true,
          error: passwordError,
        },
      }));
    }
  }

  showAllFieldsValidated() {
    setTimeout(() => {
      this.setState({ allFieldsValidated: false });
    }, 1500);
  }

  render() {
    const { email, password, allFieldsValidated } = this.state;
    return (
      <>
        <div
          className="d-flex justify-content-center align-items-center"
          style={{ height: "100vh" }}>
          <div
            className="form shadow rounded p-3 bg-white"
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
                  onMouseDown={() => this.setState({ submitCalled: true })}
                  disabled={
                    email.error || password.error
                      ? true
                      : email.error === false && password.error === false
                      ? false
                      : false
                  }>
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
