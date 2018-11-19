import { combineReducers } from "redux";
import { reducer as reduxForm } from "redux-form";
import authReducer from "./authReducer";
import challengesReducer from "./challengesReducer";
import mountainsReducer from "./mountainsReducer";
import selectedMountainIdsReducer from "./selectedMountainIdsReducer";

export default combineReducers({
  auth: authReducer,
  challenges: challengesReducer,
  mountains: mountainsReducer,
  selectedMountainIds: selectedMountainIdsReducer,
  form: reduxForm
});
