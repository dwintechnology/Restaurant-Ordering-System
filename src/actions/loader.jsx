import constants from "../constants";

export const showLoading = () => (dispatch) => {
    return dispatch(
        {
            type: constants.loader.SHOW_LOADING,
            payload: { }
        })
}

export const hideLoading = () => (dispatch) => {

    return dispatch(
        {
            type: constants.loader.HIDE_LOADING,
            payload: { }
        })
}
