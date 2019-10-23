const INITIAL_STATE = {};

console.log('INTIAL STATE Menu', INITIAL_STATE)
export default function (state = INITIAL_STATE, action) {
    // eslint-disable-next-line default-case
    switch (action.type) {
        case "": {
            return {
                ...state,
                firebaseLogin: action.payload
            }
        }
        case "": {
            return {
                ...state,
                errorMessage: action.message
            }
        }
        default:
            return state
    }
}