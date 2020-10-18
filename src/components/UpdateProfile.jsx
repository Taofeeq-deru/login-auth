import React, { Component } from "react";
import { validateFields } from "../validation";
import axios from "axios";

const initialState = {
  firstname: {
    value: "",
    validateOnChange: false,
    error: "",
  },
  lastname: {
    value: "",
    validateOnChange: false,
    error: "",
  },
  loading: false,
  submitCalled: false,
  allFieldsValidated: false,
};

const API_URL = "http://127.0.0.1:8000/rest-auth";

class UpdateProfile extends Component {
  constructor(props) {
    super(props);
    this.state = initialState;
  }

  handleBlur(validationFunc, e) {
    const field = e.target.name;

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

  async handleSubmit(e) {
    e.preventDefault();

    const { firstname, lastname } = this.state;

    const firstnameVal = firstname.value;
    const lastnameVal = lastname.value;

    const firstnameError = validateFields.validateFirstname(firstnameVal);
    const lastnameError = validateFields.validateLastname(lastnameVal);

    if ([firstnameError, lastnameError].every((e) => e === false)) {
      console.log("Success");

      this.setState({ ...this.state, loading: true, allFieldsValidated: true });
      this.showAllFieldsValidated();

      //not working, keeps saying unauthorized, problem most likely from the backend api codes
      await axios
        .put(API_URL + "/user/", {
          headers: { Authorization: `Token ${localStorage.getItem("token")}` },
          body: {
            first_name: firstnameVal,
            last_name: lastnameVal,
          },
        })
        .then((resp) => {
          console.log(resp);
          this.setState({ ...initialState, loading: false });
          //window.location.reload();
        })
        .catch((err) => {
          console.log(err);
          this.setState({ ...initialState, loading: false });
        });
    } else {
      this.setState((state) => ({
        firstname: {
          ...state.firstname,
          validateOnChange: true,
          error: firstnameError,
        },
        lastname: {
          ...state.lastname,
          validateOnChange: true,
          error: lastnameError,
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
    const { firstname, lastname, loading, allFieldsValidated } = this.state;
    return (
      <>
        <div className="form">
          <div>
            {allFieldsValidated && (
              <p className="text-success text-center">All fields validated</p>
            )}
          </div>
          <form onSubmit={(e) => this.handleSubmit(e)}>
            <div className="form-group">
              <label htmlFor="firstname" className="sr-only">
                First Name
              </label>
              <input
                type="text"
                name="firstname"
                id="firstname"
                className="form-control"
                placeholder="Enter Firstname"
                value={firstname.value}
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
                className="form-control"
                placeholder="Enter Lastname"
                value={lastname.value}
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
              <button
                type="submit"
                className="btn btn-primary form-control"
                disabled={
                  firstname.error || lastname.error
                    ? true
                    : firstname.error === false && lastname.error === false
                    ? false
                    : loading
                }
                onMouseDown={() => {
                  this.setState({ submitCalled: true });
                }}>
                {loading && (
                  <span
                    className="spinner-border spinner-border-sm"
                    role="status">
                    <span className="sr-only">loading...</span>
                  </span>
                )}
                Update
              </button>
            </div>
          </form>
        </div>
      </>
    );
  }
}

export default UpdateProfile;
