import { SELECTED_MOUNTAIN_IDS } from "../actions/types";

export default function(state = [], action) {
  switch (action.type) {
    case SELECTED_MOUNTAIN_IDS:
      return [...state, action.payload];
    default:
      return state;
  }
}
