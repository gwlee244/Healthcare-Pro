import {createStore, applyMiddleware, compose} from "redux";
//thunk is middleware that allows for async operations in actions
import thunk from "redux-thunk";
import rootReducer from "./reducers/rootReducer";

const initialState = {};

const middleware = [thunk];

const store = createStore(rootReducer, initialState, compose(applyMiddleware(...middleware)))
// window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()));

export default store;