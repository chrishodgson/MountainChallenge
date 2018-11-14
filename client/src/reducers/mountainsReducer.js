import { FETCH_MOUNTAINS } from "../actions/types";

export default function(state = [], action) {
  switch (action.type) {
    case FETCH_MOUNTAINS:
      return action.payload;
    default:
      return state;
  }
}
