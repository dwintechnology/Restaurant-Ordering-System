import constants from "../constants";

const updateType = (cartItems, product) => {
    const unincompatibleTypes = ['package', 'protein', 'rice', 'bean'];
    cartItems.forEach(element => {
        if (element.type === product.type && unincompatibleTypes.includes(product.type)) {
            cartItems = cartItems.slice().filter(elm =>
                elm.type !== product.type);
        }
    });
    return cartItems;
}

const allowToAdd = (cartItems, product) => {
    return !cartItems.find(element => element._id === product.id);
}

export const addToCart = (items, product) => (dispatch) => {
    let cartItems = items.slice();
    if (allowToAdd(cartItems, product)) {
        cartItems = updateType(cartItems, product);
        cartItems.push({
            ...product,
            count: 1,
        });
       // localStorage.setItem('cartItems', JSON.stringify(cartItems))
    }
    return dispatch(
        {
            type: constants.cartAction.ADD_FROM_CART_SUCCESS,
            payload: {
                cartItems
            }
        })
}

export const removeFromCart = (items, product) => (dispatch) => {
    const cartItems = items.slice().filter(elm =>
        elm._id !== product._id);
    //localStorage.setItem('cartItems', JSON.stringify(cartItems))
    return dispatch({
        type: constants.cartAction.REMOVE_FROM_CART_SUCCESS,
        payload: {
            cartItems: cartItems,
        }
    })
}

export const clearCart = () => (dispatch) => {
    return dispatch({
        type: constants.cartAction.CLEAR_CART,
        payload: {}
    })
}

export const setCartItems = (cartItems) => (dispatch) => {
    return dispatch({
        type: constants.cartAction.SET_ITEMS,
        payload: { cartItems }
    })
}