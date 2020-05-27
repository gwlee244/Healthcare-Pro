import  { GET_SETTINGS } from "../actions/constants";


export default (state = {}, action) => {
    switch (action.type) {
        case GET_SETTINGS:
            return action.data
        default:
            return state
    }
}