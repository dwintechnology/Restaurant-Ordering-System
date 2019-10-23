const INITIAL_STATE = {};
export default function (state = INITIAL_STATE, action) {
    // eslint-disable-next-line default-case
    switch (action.type) {
        case "SET USER SUCCESS": {
            console.log("SET PROFILE TOKEN SUCCESS", action.payload)
            return {
                ...state,
                user: action.payload,
                
                profileToken: action.payload.refreshToken,
            }
        }
        default:
          return state
    }
}