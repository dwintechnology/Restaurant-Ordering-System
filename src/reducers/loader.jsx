import constants from '../constants';

const INITIAL_STATE = { loader: false };

export default function (state = INITIAL_STATE, action) {
    // eslint-disable-next-line default-case
    switch (action.type) {
        case constants.loader.SHOW_LOADING: {
            return {
                loader: true
            }
        }
        case constants.loader.HIDE_LOADING: {
            return {
                loader: false
            }
        }
        default:
            return state
    }
}