import {combineReducers} from "redux";
import authReducer from "./authReducer";
import errorReducer from "./errorReducer";
import generalReducer from "./generalReducer";
// import statsReducer from "./statsReducer";

export default combineReducers({
    auth: authReducer,
    errors: errorReducer,
    general: generalReducer,
    // stats: statsReducer
});