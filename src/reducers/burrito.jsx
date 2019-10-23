import constants from '../constants';

const INITIAL_STATE = {};

export default function (state = INITIAL_STATE, action) {
    // eslint-disable-next-line default-case
    switch (action.type) {
        case constants.restaurantActions.GET_System_IGREDIENTS_SUCCESS: {
            return {
                ...state,
                getSystemIngradientsResponse: action.payload
            }
        }
        case constants.restaurantActions.GET_System_IGREDIENTS_FAIL: {
            return {
                ...state,
                errorMessage: action.message
            }
        }
        default:
            return state
    }
}