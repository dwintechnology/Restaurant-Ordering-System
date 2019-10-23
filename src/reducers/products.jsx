import constants from '../constants';

const INITIAL_STATE = {};

export default function (state = INITIAL_STATE, action) {
    // eslint-disable-next-line default-case
    switch (action.type) {
        case constants.products.GET_SALADA_IGREDIENTS_SUCCESS: {
            return {
                ...state,
                getSaladaResponse: action.payload
            }
        }
        case constants.products.GET_SALADA_IGREDIENTS_FAIL: {
            return {
                ...state,
                errorMessage: action.message
            }
        }
        case constants.products.GET_KESADILJA_IGREDIENTS_SUCCESS: {
            return {
                ...state,
                getKesadiljaResponse: action.payload
            }
        }
        case constants.products.GET_KESADILJA_IGREDIENTS_FAIL: {
            return {
                ...state,
                errorMessage: action.message
            }
        }
        case constants.products.GET_MENU_ITEMS_SUCCESS: {
            return {
                ...state,
                getMenuItemsResponse: action.payload
            }
        }
        case constants.products.GET_MENU_ITEMS_FAIL: {
            return {
                ...state,
                errorMessage: action.message
            }
        }
        case constants.products.GET_LIMUNADA_SUCCESS: {
            return {
                ...state,
                getLimunadaResponse: action.payload
            }
        }
        case constants.products.GET_LIMUNADA_FAIL: {
            return {
                ...state,
                errorMessage: action.message
            }
        }
        case constants.products.GET_DESERT_SUCCESS: {
            return {
                ...state,
                getDesertResponse: action.payload
            }
        }
        case constants.products.GET_DESERT_FAIL: {
            return {
                ...state,
                errorMessage: action.message
            }
        }
        default:
            return state
    }
}