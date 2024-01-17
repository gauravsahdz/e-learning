import {
  GET_COURSES,
  GET_COURSE,
  ENROLL_COURSE,
  MARK_COMPLETE,
  SEARCH,
} from "../types";

const initialState = {
  courses: [],
  loading: true,
  course: {},
  enrollment: {},
  marking: {},
};

export default function (state = initialState, action) {
  switch (action.type) {
    case GET_COURSES:
      return {
        ...state,
        courses: action.payload,
        loading: false,
      };
    case GET_COURSE:
      return {
        ...state,
        course: action.payload,
        loading: false,
      };
    case ENROLL_COURSE:
      return {
        ...state,
        enrollment: action.payload,
        loading: false,
      };
    case MARK_COMPLETE:
      return {
        ...state,
        marking: action.payload,
        loading: false,
      };
    case SEARCH:
      return {
        ...state,
        courses: action.payload,
        loading: false,
      };
    default:
      return state;
  }
}
