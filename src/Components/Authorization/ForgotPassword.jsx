import React, { Component } from 'react';
import { connect } from 'react-redux';

import { Formik, Field } from 'formik';
import '../../assets/styles/Autorization/ForgotPassword.css';
import { firebaseForgotPassword } from '../../actions/authorization';
import { routePaths } from '../../routes';
import ErrorHoc from '../../ErrorHoc';
import { formError } from '../../NotificationMessages';
import ReactNotification from "react-notifications-component";
import { ClipLoader } from 'react-spinners';


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

class ForgotPassword extends Component {
  constructor(props) {
    super(props);
    this.notificationDOMRef = React.createRef();
    this.state = {
      email: "",
      isSubmitting: false,
      showSuccessModal: false
    }
  }

  onEmailChange = (e) => {
    this.setState({ isSubmitting: e.target.value !== "" })
    this.setState({ email: e.target.value })
  }

  onModalClick = (e) => {
    this.props.history.push(routePaths.LOGIN);
  }

  showError = (msg) => {
    const errorObj = formError;
    errorObj.message = msg ? msg : errorObj.message;
    this.notificationDOMRef.current.addNotification(formError);
  }

  render() {
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
          <div className="forgot-page-container">
            <h1>Zaboravili ste lozinku</h1>
            <div className="forgot">
              <Formik
                initialValues={{ email: '', password: '', name: '', date: "", gender: false }}
                onSubmit={(values, { setSubmitting }) => {
                  try {
                    this.props.firebaseForgotPassword(this.state.email);
                    this.setState({ showSuccessModal: true })
                    this.props.history.push(routePaths.LOGIN);
                  } catch (error) {
                    this.showError(error.message);
                    this.setState({ showSuccessModal: false })
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
                      <Field
                        type="email"
                        name="email"
                        placeholder="Email address"
                        className="emailInput"
                        value={this.state.name}
                        onChange={this.onEmailChange}
                      />
                      <button type="submit" disabled={!this.state.isSubmitting} className="register-button">
                        Zaboravili ste lozinku
                  </button>
                    </form>
                  )}
              </Formik>
            </div>
          </div>
        }
        {
          this.state.showSuccessModal ?
            <div></div>
            // <Success showModal={this.state.showSuccessModal} modalMessage="{this.state.errorModalMessage}" />
            : <div></div>
        }
      </div>

    );
  }
}

export default connect(mapStateToProps, {
  firebaseForgotPassword
})(ErrorHoc(ForgotPassword));
