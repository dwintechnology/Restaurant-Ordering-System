import constants from '../constants';

const INITIAL_STATE = {};

export default function (state = INITIAL_STATE, action) {
    // eslint-disable-next-line default-case
    switch (action.type) {
        case constants.revards.GET_REVARDS_SUCCESS: {
            return {
                ...state,
                getRevardsResponse: action.payload
            }
        }
        case constants.revards.GET_REVARDS_FAIL: {
            return {
                ...state,
                errorMessage: action.message
            }
        }
        default:
            return state
    }
}