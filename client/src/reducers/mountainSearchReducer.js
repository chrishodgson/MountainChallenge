import { SEARCH_MOUNTAINS, CLEAR_SEARCH_MOUNTAINS } from "../actions/types";

export default function(state = [], action) {
  console.log(action.payload, action.type);
  switch (action.type) {
    case SEARCH_MOUNTAINS:
      return action.payload;
    case CLEAR_SEARCH_MOUNTAINS:
      return [];
    default:
      return state;
  }
}
