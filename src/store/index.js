import { createStore as createReduxStore } from "redux";
import makeRootReducer from "./reducers";

// ======================================================
// Store Instantiation
// ======================================================

const initialState = window.__INITIAL_STATE__;
const store = createReduxStore(makeRootReducer(), initialState);

export default store;

// ======================================================
// Actions
// ======================================================

export { default as OrderActions } from "./order";
