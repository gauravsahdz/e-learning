import { combineReducers } from "redux";
import courseReducer from "./coursesReducer";
import userReducer from "./usersReducer";

export default combineReducers({
  courses: courseReducer,
  course: courseReducer,
  user: userReducer,
  enrollment: courseReducer,
  marking: courseReducer,
});
