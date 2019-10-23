import axios from 'axios'
import constants from '../constants'

export function getSystemIngredients() {
    return function (dispatch) {
        axios.get(constants.api.url + "/products/system/")
            .then(function (response) {
                dispatch({
                    type: constants.restaurantActions.GET_System_IGREDIENTS_SUCCESS,
                    payload: response.data,
                });
            }).catch(function (error) {
                dispatch({
                    type: constants.restaurantActions.GET_System_IGREDIENTS_FAIL,
                    message: error
                });
            });
    }
}