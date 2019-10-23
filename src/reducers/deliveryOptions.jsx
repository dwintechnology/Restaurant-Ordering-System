import constants from '../constants';

const INITIAL_STATE = {
    ordering_time: '',
    restaurant: '',
    ordering_type: '',
    type: 'card',
    products: []
};

export default function (state = INITIAL_STATE, action) {

    switch (action.type) {
        case constants.deliveryActions.PICKUP_TIME: {
            let orderingTime = new Date();
            orderingTime.setHours(action.data.orderingTime.split(':')[0]);
            orderingTime.setMinutes(action.data.orderingTime.split(':')[1]);
            return {
                ...state,
                ordering_time: new Date(orderingTime)
            }
        }
        case constants.deliveryActions.RESTAURANT: {
            return {
                ...state,
                restaurant: action.data.restaurant
            }
        }
        case constants.deliveryActions.ORDERING_TYPE: {
            return {
                ...state,
                ordering_type: action.data.orderingType
            }
        }
        case constants.deliveryActions.ADD_PRODUCT: {
            const products = [...state.products];
            products.push(action.data.product);
            return {
                ...state,
                products
            }
        }
        case constants.deliveryActions.UPDATE_PRODUCT: {
            const products = [...state.products].map(product => {
                if (product.productId === action.data.product.productId) {
                    return action.data.product;
                }
                return product;
            })
            return {
                ...state,
                products
            }
        }
        case constants.deliveryActions.CHANGE_PRODUCT: {
            return {
                ...state,
                currentProduct: action.data.product
            }
        }
        case constants.deliveryActions.REMOVE_PRODUCT: {
            let products = [...state.products];
            const product = state.products.find(item => item.productId === action.data.productId
                && (!item.parentId || (item.parentId === action.data.productId)));
            const index = products.findIndex(item => item.productId === action.data.productId
                && (!item.parentId || (item.parentId === action.data.productId)));
            if (product && product.type !== 'system' && product.additionals) {
                product.additionals.forEach(itemId => {
                    products = products
                        .map(item => {
                            if (item.productId === itemId) {
                                if (item.quantity - product.quantity) {
                                    return {
                                        productId: itemId,
                                        quantity: item.quantity - product.quantity
                                    }
                                } else return null;
                            } else return item;
                        })
                        .filter(item => item);
                });
            }
            products.splice(index, 1);
            return {
                ...state,
                products
            }
        }
        case constants.deliveryActions.ADD_System: {
            const { restaurantData, restaurantName, restaurantId } = action.data;
            const products = state.products;
            if (restaurantId) {
                const index = products.findIndex(item => item.productId === restaurantId);
                products.splice(index, 1);
            }
            let totalPrice = 0;
            let totalCalories = 0;
            const packageObj = restaurantData.find(item => item.type === 'package');
            const protein = restaurantData.find(item => item.type === 'protein');
            const salads = restaurantData.filter(item => item.type === 'salad');
            const salsas = restaurantData.filter(item => item.type === 'salsa');
            restaurantData.forEach(item => totalPrice += item.price);
            restaurantData.forEach(item => totalCalories += item.calorie);
            const restaurant = {
                name: restaurantName,
                type: 'system',
                // description: 
                "package": packageObj._id,
                protein: protein._id,
                salsa: salsas.map(item => item._id),
                salad: salads.map(item => item._id),
                calorie: totalCalories,
                price: totalPrice,
                quantity: 1,
                productId: new Date().getTime()
            };
            const bean = restaurantData.find(item => item.type === 'bean');
            const rice = restaurantData.find(item => item.type === 'rice');
            let description = `${packageObj.name}, ${protein.name}`
            if (bean) {
                restaurant.bean = bean._id;
                description += `, ${bean.name}`;
            }
            if (rice) {
                restaurant.rice = rice._id;
                description += `, ${rice.name}`;
            }
            salads.map(salad => description += `, ${salad.name}`);
            salsas.map(salsa => description += `, ${salsa.name}`);
            restaurant.description = description;
            products.push(restaurant);
            return {
                ...state,
                products: [...products]
            }
        }
        case constants.deliveryActions.CLEAR_CURRENT_PRODUCT: {
            const stateObj = state;
            delete stateObj.currentProduct;
            return {
                ...stateObj
            }
        }
        case constants.deliveryActions.CHANGE_QUANTITY: {
            const products = [...state.products].map(item => {
                if (item.productId === action.data.productId && (!item.parentId
                    || (item.parentId && item.parentId === action.data.parentId))) {
                    return {
                        ...item,
                        quantity: action.data.quantity
                    }
                }
                return item;
            });
            return {
                ...state,
                products
            }
        }
        case constants.deliveryActions.PREPARE_ORDER_DATA_TO_PAYMENT: {
            const products = state.products.map(product => {
                const productData = { ... product };
                if (product.type === "system") {
                    delete productData.name;
                    delete productData.productId;
                }
                delete productData.price;
                delete productData.calorie;
            });
            return {
                ...state,
                products
            };
        }
        case constants.deliveryActions.PAYMENT_TYPE: {
            return {
                ...state,
                type: action.data.type
            }
        }
        case constants.deliveryActions.SET_REWARD: {
            return {
                ...state,
                [action.data.type]: action.data.data
            }
        }
        case constants.deliveryActions.PROMO_CODE_REWARD: {
            return {
                ...state,
                promo_code_reward: action.data
            }
        }
        case constants.deliveryActions.SET_CARD: {
            return {
                ...state,
                card: action.data.cardId
            }
        }
        case constants.deliveryActions.SET_CVC: {
            return {
                ...state,
                confirmed_cvc: action.data
            }
        }
        case constants.deliveryActions.SET_PRODUCTS: {
            return {
                ...state,
                products: action.data.products
            }
        }
        case constants.deliveryActions.RESET: {
            return INITIAL_STATE;
        }
        default:
            return state
    }
}