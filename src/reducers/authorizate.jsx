import constants from "../constants";

const INITIAL_STATE = {};

console.log('INTIAL STATE', INITIAL_STATE)
export default function (state = INITIAL_STATE, action) {
    // eslint-disable-next-line default-case
    switch (action.type) {
        case constants.profileActions.LOGIN_SUCCESS: {
            console.log("---LOGIN_SUCCESS------", action.payload)
            const singInObj = { signInSuccess: true, userLoginResponse: action.payload }
            return {
                ...state,
                ...singInObj
            };
        }
        case constants.profileActions.LOGIN_FAIL: {
            const singInObj = { signInSuccess: false, errorMessage: action.message }
            return {
                ...state,
                ...singInObj
            }
        }
        case constants.profileActions.SIGN_UP_SUCCESS: {
            const singUpObj = { signUpSuccess: true, firebaseSignUpResponce: action.payload }
            console.log("----SIGN_UP_SUCCES----", singUpObj)
            return {
                ...state,
                ...singUpObj
            };
        }
        case constants.profileActions.SIGN_UP_FAIL: {
            const singUpObj = { signUpSuccess: false, errorMessage: action.message }
            return {
                ...state,
                ...singUpObj
            }
        }
        case constants.profileActions.LOG_OUT_SUCCESS: {
            console.log("----LOG_OUT_SUCCESS----", action.payload)
            return {
                ...state,
                profileToken: {},
                logoutStatus: action.payload
            }
        }
        default:
            return state
    }
}