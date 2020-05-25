import {combineReducers} from "redux";
import authReducer from "./authReducer";
import errorReducer from "./errorReducer";
import generalReducer from "./generalReducer";

export default combineReducers({
    auth: authReducer,
    errors: errorReducer,
    general: generalReducer
});