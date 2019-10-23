import rootReducer from './reducers/index';
import reduxThunk from 'redux-thunk'
import { createStore, applyMiddleware } from 'redux';
const INITIAL_STATE = {};

if (localStorage.getItem('cartItems')) {
    INITIAL_STATE.cart = { items: JSON.parse(localStorage.getItem('cartItems')) }
}

const createStoreWithMiddleware = applyMiddleware(reduxThunk)(createStore);
const store = createStoreWithMiddleware(rootReducer, /* preloadedState, */
    window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__());

export default store;