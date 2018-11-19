import { SEARCH_MOUNTAINS } from "../actions/types";

export default function(state = [], action) {
  switch (action.type) {
    case SEARCH_MOUNTAINS:
      return action.payload;
    default:
      return state;
  }
}
