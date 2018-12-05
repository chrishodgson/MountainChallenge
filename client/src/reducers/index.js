import { combineReducers } from "redux";
import { reducer as reduxForm } from "redux-form";
import authReducer from "./authReducer";
import challengesReducer from "./challengesReducer";
import mountainSearchReducer from "./mountainSearchReducer";
import mountainSelectionReducer from "./mountainSelectionReducer";
import mountainListSearchReducer from "./mountainListSearchReducer";

export default combineReducers({
  auth: authReducer,
  challenges: challengesReducer,
  mountainSearch: mountainSearchReducer,
  mountainSelection: mountainSelectionReducer,
  mountainListSearch: mountainListSearchReducer,
  form: reduxForm
});
