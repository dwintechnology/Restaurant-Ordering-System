import { combineReducers } from 'redux';
import authorizate from './authorizate';
import restaurant from './restaurant';
import products from './products';
import cart from './cart';
import profileToken from './profileToken';
import bankCards from './bankCards';
import deliveryOptions from './deliveryOptions';
import loader from './loader';
import myRevards from './myRevards';

const rootReducer = combineReducers({
    authorizationReducer: authorizate,
    restaurantReducer: restaurant,
    productsReducer: products,
    cartReducer: cart,
    setProfileTokenReducer: profileToken,
    bankCardsReducer: bankCards,
    deliveryOptionsReducer: deliveryOptions,
    loaderReducer: loader,
    myRevardsReducer: myRevards
});


export default rootReducer;