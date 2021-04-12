import { combineReducers } from "redux";

const adReducers = (state = { user: null, loading: false,ad:null }, action) => {
  switch (action.type) {
    case "USER":
      return { ...state, user: action.payload };
    case "SET_LOADING":
      return { ...state, loading: action.payload };
    case "GET_AD":
      return { ...state, ad: action.payload };
    default:
      return state;
  }
};

export default combineReducers({
  adReducers,
});
