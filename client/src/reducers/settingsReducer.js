import  { SET_SETTINGS } from "../actions/constants";


export default function(state = initialState, action) {
    switch (action.type) {
        case SET_SETTINGS:
            return action.data
        default:
            return state
    }
}