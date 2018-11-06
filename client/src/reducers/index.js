import { combineReducers } from "redux";
import { reducer as reduxForm } from "redux-form";
import authReducer from "./authReducer";
import challengesReducer from "./challengesReducer";

export default combineReducers({
  auth: authReducer,
  challenges: challengesReducer,
  form: reduxForm
});
