import { combineReducers } from "redux";
import { reducer as reduxForm } from "redux-form";
import authReducer from "./authReducer";
import challengesReducer from "./challengesReducer";
import mountainSearchReducer from "./mountainSearchReducer";
import mountainSelectionReducer from "./mountainSelectionReducer";

export default combineReducers({
  auth: authReducer,
  challenges: challengesReducer,
  mountainSearch: mountainSearchReducer,
  mountainSelection: mountainSelectionReducer,
  form: reduxForm
});
