import { combineReducers } from "redux";
import { reducer as reduxForm } from "redux-form";
import authReducer from "./authReducer";
import challengesReducer from "./challengesReducer";
import mountainsReducer from "./mountainsReducer";

export default combineReducers({
  auth: authReducer,
  challenges: challengesReducer,
  mountains: mountainsReducer,
  form: reduxForm
});
