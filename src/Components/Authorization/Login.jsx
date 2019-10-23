import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Formik, Field } from 'formik';
import { withRouter } from 'react-router-dom';
import ReactNotification from "react-notifications-component";
import StyledFirebaseAuth from "react-firebaseui/StyledFirebaseAuth";
import firebase from 'firebase';

import { routePaths } from '../../routes';
import { formError } from '../../NotificationMessages';
import { firebaseLogin, firebaseFBLogin, createUser } from '../../actions/authorization';

import '../../assets/styles/Autorization/Login.css';

function mapStateToProps(state) {
  return {
    singInObj: state.authorizationReducer,
  };
}

class Login extends Component {

  constructor(props) {
    super(props);
    this.notificationDOMRef = React.createRef();
    this.uiConfig = {
      signInFlow: "popup",
      signInOptions: [
        firebase.auth.FacebookAuthProvider.PROVIDER_ID
      ],
      callbacks: {
        signInSuccess: () => false
      }
    }
  }

  componentWillReceiveProps(nextProps) {
    const _singInObjResponse = nextProps.singInObj;
    if (_singInObjResponse.signInSuccess !== this.props.singInObj.signInSuccess) {
      this.handleGetUserDataChange(_singInObjResponse)
    }
  }

  componentDidMount = () => {
    firebase.auth().onAuthStateChanged(user => {
      // this.setState({ loading: false })
      if (user && user.providerData && user.providerData[0].providerId  === "facebook.com") {
        createUser({ 
          username: user.providerData[0].displayName, 
          email: user.email,
          is_fb_user : true
        })
          .then((response) => {
            this.props.history.push(routePaths.PROFILEINFO);
            this.props.firebaseFBLogin(user, true);
          })
          .catch((error) => {
            if (error.response && error.response.data.error === "User already exists!") {
              this.props.history.push(routePaths.PROFILEINFO);
              this.props.firebaseFBLogin(user, true);
            }
          })

        
      }
    })
  }

  handleGetUserDataChange(singInObj) {
    if (!singInObj.signInSuccess) {
      this.showError(singInObj.errorMessage.message);
      return;
    }
    this.props.history.push(routePaths.PROFILEINFO);
  }

  showError = (msg) => {
    const errorObj = formError;
    errorObj.message = msg ? msg : errorObj.message;
    this.notificationDOMRef.current.addNotification(formError);
  }

  // eslint-disable-next-line no-undef
  registrationButtonClick = () => {
    this.props.history.push(routePaths.REGISTER);
  };

  forgotPasswordButtonClick = () => {
    this.props.history.push(routePaths.FORGOTPASSOWRD);
  };

  render() {
    return (
      <div>
        <ReactNotification isMobile="true" ref={this.notificationDOMRef} />
        <div className="login-div">
          <h1>Prijavite se </h1>
          <StyledFirebaseAuth
              uiConfig={this.uiConfig}
              firebaseAuth={firebase.auth()}
            />
          <Formik
            initialValues={{ email: '', password: '' }}
            onSubmit={(values, { setSubmitting }) => {
              try {
                // eslint-disable-next-line no-undef
                this.props.firebaseLogin(values.email, values.password)
                setSubmitting(false);
              } catch (error) {
                this.showError();
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
                <form onSubmit={handleSubmit} className="login-form">
                  <Field
                    type="email"
                    name="email"
                    placeholder="Email addresa"
                    className="emailInput"
                  />
                  <Field type="password" name="password" placeholder="Lozinka" className="passwordInput" />
                  <label className="label-zaboravili" onClick={this.forgotPasswordButtonClick}>Zaboravili ste lozinku? </label>
                  <button type="submit" disabled={isSubmitting} className="login-button">
                    PRIJAVITE SE
                                </button>
                  <p onClick={this.registrationButtonClick}>
                    Nemate nalog? Registrujte se.
                                </p>
                </form>
              )}
          </Formik>
        </div>
      </div>
    );
  }
}
export default withRouter(connect(mapStateToProps, {
  firebaseLogin, firebaseFBLogin, createUser
})(Login));