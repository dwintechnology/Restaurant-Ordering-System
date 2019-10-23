// import axios from 'axios';
import Cookies from 'universal-cookie';
import Firebase from '../FirebaseConfig'
import constants from '../constants';
import store from '../store';
import axios from 'axios'

export const firebaseLogin = (email, pass) => dispatch => {
  Firebase.doSignInWithEmailAndPassword(email, pass)
    .then(response => {
      if (response.user) {
        store.dispatch(setProfileToken(response.user));
      }
      dispatch({
        type: constants.profileActions.LOGIN_SUCCESS,
        payload: response.user,
      })
    }).catch(error => {
      dispatch({
        type: constants.profileActions.LOGIN_FAIL,
        message: error
      })
    });
}

export const firebaseFBLogin = (user, success) => dispatch => {
  if (user.email) {
    store.dispatch(setProfileToken(user));
  }
  success ? dispatch({
    type: constants.profileActions.LOGIN_SUCCESS,
    payload: user,
  }) :
    dispatch({
      type: constants.profileActions.LOGIN_FAIL,
      message: {}
    })
}


export const firebaseSignUp = (values) => dispatch => {
  Firebase.doCreateUserWithEmailAndPassword(values.email, values.password)
    .then(response => {
      if (response.user) {
        store.dispatch(setProfileToken(response.user));
      }

      dispatch({
        type: constants.profileActions.SIGN_UP_SUCCESS,
        payload: response.user,
      })
    }).catch(error => {
      dispatch({
        type: constants.profileActions.SIGN_UP_FAIL,
        message: error
      })
    });
}

export const firebaseForgotPassword = (email) => dispatch => {
  Firebase.resetPassword(email)
    .then(response => {
      console.log("--Forgot pass success----", response)
    }).catch(error => {
      console.log("--Forgot pass error----", error)
    });

}

export const fireBaseLogOut = () => dispatch => {
  const cookies = new Cookies();
  cookies.remove('_profileToken', { path: '/' });
  store.dispatch(setProfileToken(""));
  Firebase.doSignOut().then(response => {
    dispatch({
      type: constants.profileActions.LOG_OUT_SUCCESS,
      payload: constants.profileActions.LOG_OUT_SUCCESS,
    })
  })
}

export const setProfileToken = (user) => {
  let date = new Date();
  date.setTime(date.getTime() + (60 * 60 * 1000));
  const cookies = new Cookies();
  cookies.set('_profileToken', user, { path: '/', expires: date });
  console.log("setProfileToken", user.refreshToken)
  return ({
    type: "SET USER SUCCESS",
    payload: user
  })
}

export const setUser = (user) => {
  return ({
    type: "CREATE USER SUCCESS",
    payload: user
  })
}

export const getProfileToken = () => {
  let date = new Date();
  date.setTime(date.getTime() + (60 * 60 * 1000));
  const cookies = new Cookies();
  let _profileToken = cookies.get('_profileToken')
  console.log("Get profile token", _profileToken)
  if (_profileToken) {
    store.dispatch ({
      type: "SET USER SUCCESS",
      payload: _profileToken
    })
  }
}

export function createUser(user) {
  return axios.post(constants.api.url + "/users/", user);

}
