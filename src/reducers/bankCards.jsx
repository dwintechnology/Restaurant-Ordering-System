import constants from '../constants';

const INITIAL_STATE = {};

export default function (state = INITIAL_STATE, action) {
    // eslint-disable-next-line default-case
    switch (action.type) {
        case constants.cards.GET_BANK_CARDS_SUCCESS: {
            return {
                ...state,
                getBankCardResponse: action.payload,
                bankCardResponseStatus: action.status
            }
        }
        case constants.cards.GET_BANK_CARDS_FAIL: {
            console.log("GET_BANK_CARDS_FAIL", action)
            return {
                ...state,
                errorMessage: action.message
            }
        }
        case constants.cards.DELATE_BANK_CARDS_SUCCESS: {
            return {
                ...state,
                delateBankCardResponse: action.payload,
                delateBankCardResponseStatus: action.status
            }
        }
        case constants.cards.DELATE_BANK_CARDS_FAIL: {
            console.log("GET_BANK_CARDS_FAIL", action)
            return {
                ...state,
                errorMessage: action.message
            }
        }
        case constants.cards.ADDED_BANK_CARDS_SUCCESS: {
            return {
                ...state,
                addBankCardResponse: action.payload
            }
        }
        case constants.cards.ADDED_BANK_CARDS_FAIL: {
            return {
                ...state,
                errorMessage: action.message
            }
        }
        case constants.cards.UPDATE_BANK_CARDS_SUCCESS: {
            return {
                ...state,
                updateBankCardResponse: action.payload
            }
        }
        case constants.cards.UPDATE_BANK_CARDS_FAIL: {
            return {
                ...state,
                errorMessage: action.message
            }
        }
        default:
            return state
    }
}