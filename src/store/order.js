import { createReducer, createActions } from "reduxsauce";

/* ------------- Types and Action Creators ------------- */
const { Types, Creators } = createActions({
  setDefaultOrder: null,
  saveMeal: ["meal", "numberOfPeople"],
  saveRestaurant: ["restaurant"],
  saveServings: ["servings"],
  addServing: ["serving"],
  removeServingAt: ["index"]
});

export const ProductTypes = Types;
export default Creators;

/* ------------- Initial State ------------- */

const defaultState = {
  meal: "",
  numberOfPeople: "",
  restaurant: "",
  servings: [{ dish: "", numberOfServings: "" }]
};

/* ------------- Reducers ------------- */
const setDefaultOrder = state => ({ ...defaultState });
const saveMeal = (state, { meal, numberOfPeople }) => {
  return {
    ...state,
    meal,
    numberOfPeople
  };
};
const saveRestaurant = (state, { restaurant }) => {
  return {
    ...state,
    restaurant
  };
};
const saveServings = (state, { servings }) => {
  return {
    ...state,
    servings
  };
};
const addServing = (state, { serving }) => {
  return {
    ...state,
    servings: [
      ...state.servings,
      {
        ...serving
      }
    ]
  };
};
const removeServingAt = (state, { index }) => {
  const servings = [...state.servings];
  servings.splice(index, 1);

  return {
    ...state,
    servings
  };
};

/* ------------- Hookup Reducers To Types ------------- */
export const orderReducer = createReducer(defaultState, {
  [Types.SET_DEFAULT_ORDER]: setDefaultOrder,
  [Types.SAVE_MEAL]: saveMeal,
  [Types.SAVE_RESTAURANT]: saveRestaurant,
  [Types.SAVE_SERVINGS]: saveServings,
  [Types.ADD_SERVING]: addServing,
  [Types.REMOVE_SERVING_AT]: removeServingAt
});