import constants from '../constants';

export const setPickUpTime = (pickUpTime) => dispatch => {
    dispatch({
        type: constants.deliveryActions.PICKUP_TIME,
        data: { orderingTime: pickUpTime }
    })
}

export const setRestaurant = (restaurant) => dispatch => {
    dispatch({
        type: constants.deliveryActions.RESTAURANT,
        data: { restaurant }
    })
}

export const setOrderType = (type) => dispatch => {
    dispatch({
        type: constants.deliveryActions.ORDERING_TYPE,
        data: { orderingType: type }
    })
}

export const addProduct = (product) => dispatch => {
    console.log('product::: :', product);
    dispatch({
        type: constants.deliveryActions.ADD_PRODUCT,
        data: { product }
    })
}

export const updateProduct = (product) => dispatch => {
    dispatch({
        type:constants.deliveryActions.UPDATE_PRODUCT,
        data: { product }
    })
}
export const removeProduct = (productId, parentId) => dispatch => {
    dispatch({
        type: constants.deliveryActions.REMOVE_PRODUCT,
        data: { productId, parentId }
    })
}

export const addSystemToOrder = (restaurantData, restaurantName, restaurantId) => dispatch => {
    dispatch({
        type: constants.deliveryActions.ADD_System,
        data: { restaurantData, restaurantName, restaurantId }
    })
}

export const setProducts = (products) => dispatch => {
    dispatch({
        type: constants.deliveryActions.SET_PRODUCTS,
        data: { products }
    })
}

export const changeQuantity = (productId, parentId, quantity) => dispatch => {
    if (quantity < 1 || quantity > 50) {
        return;
    }
    dispatch({
        type: constants.deliveryActions.CHANGE_QUANTITY,
        data: { productId, parentId, quantity }
    })
}

export const setPaymentType = (type) => dispatch => {
    dispatch({
        type: constants.deliveryActions.PAYMENT_TYPE,
        data: { type }        
    })
}

export const prepareOrderDataToSend = () => dispatch => {
    dispatch({
        type: constants.deliveryActions.PREPARE_ORDER_DATA_TO_PAYMENT,
        data: {}
    })
}

export const setCard = (cardId) => dispatch => {
    dispatch({
        type: constants.deliveryActions.SET_CARD,
        data: { cardId }
    })
}

export const setChangingProduct = (product) => dispatch => {
    dispatch({
        type: constants.deliveryActions.CHANGE_PRODUCT,
        data: { product }
    })
}

export const clearCurrentProduct = () => dispatch => {
    dispatch({
        type: constants.deliveryActions.CLEAR_CURRENT_PRODUCT,
    })
}

export const setRewardData = (type, data) => dispatch => {
    dispatch({
        type: constants.deliveryActions.SET_REWARD,
        data: { type, data }
    })
}

export const setPromoCodeReward = (data) => dispatch => {
    dispatch({
        type: constants.deliveryActions.PROMO_CODE_REWARD,
        data
    })
}

export const setCVC = (cvc) => dispatch => {
    dispatch({
        type: constants.deliveryActions.SET_CVC,
        data: cvc
    })
}

export const resetOrderData = () => dispatch => {
    dispatch({
        type: constants.deliveryActions.RESET
    })
}