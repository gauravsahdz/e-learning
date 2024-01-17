import {
  GET_COURSES,
  GET_COURSE,
  ENROLL_COURSE,
  MARK_COMPLETE,
  SEARCH,
} from "../types";

const url = "http://localhost:3000";

export const getToken = async () => {
  try {
    const token = await localStorage.getItem("token");
    return token;
  } catch (error) {
    console.log(error);
  }
};

export const getCourses = () => async (dispatch) => {
  try {
    const res = await fetch(`${url}/courses`);
    const resJson = await res.json();
    dispatch({
      type: GET_COURSES,
      payload: resJson.courses,
    });
  } catch (e) {
    console.log(e);
  }
};

export const getCourse = (id) => async (dispatch) => {
  try {
    const res = await fetch(`${url}/courses/${id}`);
    const resJson = await res.json();
    dispatch({
      type: GET_COURSE,
      payload: resJson.course,
    });
  } catch (e) {
    console.log(e);
  }
};

export const enrollCourse = (id) => async (dispatch) => {
  try {
    const token = await getToken();
    const data = await fetch(`${url}/courses/${id}`, {
      method: "POST",
      headers: new Headers({
        Authorization: token,
      }),
    });
    const result = await data.json();
    dispatch({
      type: ENROLL_COURSE,
      payload: result,
    });
  } catch (e) {
    console.log(e);
  }
};

export const markComplete = (id) => async (dispatch) => {
  try {
    const token = await getToken();
    const data = await fetch(`${url}/courses/${id}`, {
      method: "PATCH",
      headers: new Headers({
        Authorization: token,
      }),
    });
    const result = await data.json();
    dispatch({
      type: MARK_COMPLETE,
      payload: result,
    });
  } catch (e) {
    console.log(e);
  }
};

export const searchCourse = (searchText) => async (dispatch) => {
  try {
    const res = await fetch(`${url}/courses/search?q=${searchText}`);
    const resJson = await res.json();
    dispatch({
      type: SEARCH,
      payload: resJson.courses,
    });
  } catch (e) {
    console.log(e);
  }
};
