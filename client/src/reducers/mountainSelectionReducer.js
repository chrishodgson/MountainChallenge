import { SELECT_MOUNTAINS } from "../actions/types";

export default function(state = [], action) {
  switch (action.type) {
    case SELECT_MOUNTAINS:
      return [...state, action.payload];
    default:
      return state;
  }
}
