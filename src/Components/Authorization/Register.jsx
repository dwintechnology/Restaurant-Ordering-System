import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';

import { Formik, Field } from 'formik';
import '../../assets/styles/Autorization/Register.css';
import { firebaseSignUp, createUser, setProfileToken } from '../../actions/authorization';
import { routePaths } from '../../routes';
import ErrorHoc from '../../ErrorHoc';
import { formError } from '../../NotificationMessages';
import ReactNotification from "react-notifications-component";
import firebase from "firebase";
import StyledFirebaseAuth from "react-firebaseui/StyledFirebaseAuth";
import { ClipLoader } from 'react-spinners';

import Select from 'react-select';
function mapStateToProps(state) {
  return {
    singUpObj: state.authorizationReducer,
  };
}

const override = {
  position: "absolute",
  left: "50%",
  top: "50%",
  "z-index": 99999
};

const months = [
  { label: 'JAN', value: 1 }, { label: 'FEB', value: 2 },
  { label: 'MAR', value: 3 }, { label: 'APR', value: 4 },
  { label: 'MAY', value: 5 }, { label: 'JUN', value: 6 },
  { label: 'JUL', value: 7 }, { label: 'AUG', value: 8 },
  { label: 'SEP', value: 9 }, { label: 'OGT', value: 10 },
  { label: 'NOV', value: 11 }, { label: 'DEC', value: 12 }
];

class Register extends Component {
  constructor(props) {
    super(props);
    this.notificationDOMRef = React.createRef();
    this.state = {
      date: '',
      year: '',
      day: '',
      month: '',
      isSignedIn: false,
      loading: false,
      gender: "",
      isSubmitting: false,
      name: "",
      email: "",
      password: "",
      repeatpassword: ""
    }
    this.uiConfig = {
      signInFlow: "popup",
      signInOptions: [
        firebase.auth.FacebookAuthProvider.PROVIDER_ID
      ],
      callbacks: {
        signInSuccess: () => false
      }
    }
    firebase.auth().signOut();
  }

  onGenderMaleChange = (e) => {
    this.setState({ gender: "male" })
    console.log(this.state)
  }

  onGenderFemaleChange = (e) => {
    this.setState({ gender: "female" })
  }

  onNameChange = (e) => {
    this.setState({ name: e.target.value })
  }

  onEmailChange = (e) => {
    this.setState({ email: e.target.value })
  }

  onPasswordChange = (e) => {
    this.setState({ password: e.target.value })
    if (e.target.value === this.state.repeatpassword) {
      this.setState({ isSubmitting: true })
    } else {
      this.setState({ isSubmitting: false })
    }
  }

  onRepeatPasswordChange = (e) => {
    this.setState({ repeatpassword: e.target.value })
    if (this.state.password === e.target.value) {
      this.setState({ isSubmitting: true })
    } else {
      this.setState({ isSubmitting: false })
    }
  }

  componentDidMount = () => {
    firebase.auth().onAuthStateChanged(user => {
      // this.setState({ loading: false })
      if (user) {
        this.setState({ loading: true })
        const newUser = {
          username: this.state.name,
          email: user.email,
          is_fb_user: user && user.providerData && user.providerData[0].providerId === "facebook.com"
        }
        if (newUser.is_fb_user) {
          newUser.username = user.providerData[0].displayName
        }
        if (this.state.gender !== "") {
          newUser.gender = this.state.gender
        }
        if (this.state.date !== "Invalid date" || this.state.date !== "") {
          newUser.birthday = this.state.date
        }
        createUser(newUser)
          .then((response) => {
            this.props.history.push(routePaths.PROFILEINFO);
            setProfileToken(user);
            this.setState({ loading: false })
          })
          .catch((error) => {
            if (error.response && error.response.data.error === "User already exists!") {
              this.props.history.push(routePaths.PROFILEINFO);
              setProfileToken(user);
            }
          })
        this.setState({ loading: false })
      }
    })
  }

  componentWillReceiveProps(nextProps) {
    const _signUpSuccess = nextProps.singUpObj;
    console.log("_signUpSuccess", _signUpSuccess)
    console.log("this.props.signUpSuccess", this.props)

    if (_signUpSuccess.signUpSuccess !== this.props.singUpObj.signUpSuccess) {
      this.handleGetUserDataChange(_signUpSuccess)
    }
  }

  handleGetUserDataChange(singUpObj) {
    if (!singUpObj.signUpSuccess) {
      console.log("singUpObj", singUpObj);
      // this.props.showCustomError(singUpObj.errorMessage.message);
      this.setState({ loading: false })
      this.showError(singUpObj.errorMessage.massage);
      return;
    }
  }

  showError = (msg) => {
    const errorObj = formError;
    errorObj.message = msg ? msg : errorObj.message;
    this.notificationDOMRef.current.addNotification(formError);
  }

  yearList = () => {
    let years = [];
    for (var i = 0; i <= 115; i++) {
      years.push({ label: 2019 - i, value: "year" })
    }
    return years;
  }

  dayList = () => {
    let days = [];
    for (var i = 0; i < 31; i++) {
      days.push({ label: i + 1, value: "day" })
    }
    return days;
  }

  yearChange = (selectedOption) => {
    this.setState({ year: selectedOption.label });
    this.setState({ date: new Date(this.state.day + "-" + this.state.month + "-" + selectedOption.label) })
  };

  monthChange = (selectedOption) => {
    this.setState({ month: selectedOption.value });
    this.setState({ date: new Date(this.state.day + "-" + selectedOption.value + this.state.year) })
  };

  dayChange = (selectedOption) => {
    this.setState({ day: selectedOption.label });
    this.setState({ date: new Date(selectedOption.label + this.state.month + this.state.year) })
  };

  render() {
    // console.log("5555", this.props.userCreated)
    return (
      <div>
        <ReactNotification isMobile="true" ref={this.notificationDOMRef} />
        {this.state.loading ?
          <div className="container">
            <ClipLoader
              css={override}
              sizeUnit={"px"}
              size={100}
              color={'#2b816d'}
              loading={true}
            />
          </div> :
          <div className="page-container">
            <h1>Registrujte se </h1>
            <StyledFirebaseAuth
              uiConfig={this.uiConfig}
              firebaseAuth={firebase.auth()}
            />
            <div className="register">
              <Formik
                initialValues={{ email: '', password: '', name: '', date: "", gender: false }}
                onSubmit={(values, { setSubmitting }) => {
                  try {
                    // eslint-disable-next-line no-undef
                    if (this.state.password !== this.state.repeatpassword) {
                      this.setState({ loading: false })
                      this.showError("Password and Repeat password does not mutch");
                    } else {
                      // values.date = this.state.date;
                      values.gender = this.state.gender;
                      this.props.firebaseSignUp(this.state);
                      setSubmitting(false);
                      this.setState({ loading: true })
                    }
                  } catch (error) {
                    this.setState({ loading: false })
                    this.showError(error.message);
                    setSubmitting(false);
                  }
                }}
              >
                {({
                  errors,
                  touched,
                  handleSubmit,
                  isSubmitting,
                  /* and other goodies */
                }) => (
                    <form onSubmit={handleSubmit} className="register-form">
                      <div>
                        <p>Email registracija</p>
                      </div>
                      <Field
                        type="text"
                        name="name"
                        placeholder="Ime i prezime"
                        className="emailInput"
                        value={this.state.name}
                        onChange={this.onNameChange}
                      />
                      <Field
                        type="email"
                        name="email"
                        placeholder="Email address"
                        className="nameImput"
                        value={this.state.email}
                        onChange={this.onEmailChange}
                      />
                      <div className="birthday-div">
                        <Select
                          className="birthdaySelect"
                          options={this.dayList()}
                          onChange={this.dayChange}
                          placeholder="Day"
                        />
                        <Select
                          className="birthdaySelect"
                          options={months}
                          onChange={this.monthChange}
                          placeholder="Month"
                        />
                        <Select
                          className="birthdaySelect"
                          options={this.yearList()}
                          onChange={this.yearChange}
                          placeholder="Year"
                        />
                      </div>

                      <div className="gender-div">
                        <p>Male</p>
                        <Field className="gender-radiobutton" type="radio" name='gender' onChange={this.onGenderMaleChange} />

                        <Field className="gender-radiobutton" type="radio" name='gender' onChange={this.onGenderFemaleChange} />
                        <p>Female</p>
                      </div>
                      <Field type="password" name="password" placeholder="Lozinka" value={this.state.password} onChange={this.onPasswordChange} />
                      <Field type="password" name="repeatpassword" placeholder="Podvrdite lozinka" className="password" value={this.state.repeatpassword} onChange={this.onRepeatPasswordChange} />
                      <button type="submit" disabled={!this.state.isSubmitting} className="register-button">
                        REGISTRUJE SE
                  </button>
                    </form>
                  )}
              </Formik>
            </div>
          </div>
        }
      </div>

    );
  }
}

export default connect(mapStateToProps, {
  firebaseSignUp, createUser
})(ErrorHoc(Register));
