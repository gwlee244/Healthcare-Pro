import {combineReducers} from "redux";
import authReducer from "./authReducer";
import errorReducer from "./errorReducer";
import generalReducer from "./generalReducer";
import settingsReducer from "./settingsReducer";
import statsReducer from "./statsReducer";
import calendarReducer from "./calendarReducer";
import scheduleReducer from "./scheduleReducer";

export default combineReducers({
    auth: authReducer,
    errors: errorReducer,
    general: generalReducer,
    stats: statsReducer,
    settings: settingsReducer,
    appointments: scheduleReducer
});