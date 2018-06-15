import { combineReducers } from "redux";
import { orderReducer as order } from "./order";

export default () => {
  return combineReducers({
    order
  });
};
