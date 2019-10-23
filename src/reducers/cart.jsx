import constants from '../constants';

const INITIAL_STATE = { items: [] };

export default function (state = INITIAL_STATE, action) {
    // eslint-disable-next-line default-case
    switch (action.type) {
        case constants.cartAction.ADD_FROM_CART_SUCCESS: {
            // console.log("ADD_FROM_CART_SUCCESS", action.payload.cartItems)
            return {
                items: action.payload.cartItems
            }
        }
        case constants.cartAction.REMOVE_FROM_CART_SUCCESS: {
            // console.log("REMOVE_FROM_CART_SUCCESS", action.payload.cartItems)
            return {
                items: action.payload.cartItems
            }
        }
        case constants.cartAction.CLEAR_CART: {
            return {
                items: []
            }
        }
        case constants.cartAction.SET_ITEMS: {
            return {
                items: action.payload.cartItems
            }
        }
        default:
            return state
    }
}