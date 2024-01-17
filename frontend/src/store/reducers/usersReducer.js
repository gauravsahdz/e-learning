import { GET_ME, GET_MY_COURSES, LOGIN } from "../types";

const initialState = {
  loading: true,
  res: {},
  myCourses : [],
};

export default function (state = initialState, action) {
  switch (action.type) {
    case LOGIN:
        return {
            ...state,
            res: action.payload,
            loading: false,
        };
    case GET_ME:
      return {
        ...state,
        res: action.payload,
        loading: false,
      };
    case GET_MY_COURSES:
      return {
        ...state,
        myCourses: action.payload,
        loading: false,
      };
    default:
      return state;
  }
}
