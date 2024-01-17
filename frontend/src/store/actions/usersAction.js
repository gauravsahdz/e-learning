import { GET_ME, GET_MY_COURSES, LOGIN } from "../types";

const url = "http://localhost:3000";

export const getToken = async () => {
  try {
    const token = await localStorage.getItem("token");
    return token;
  } catch (error) {
    console.log(error);
  }
};

export const getMe = () => async (dispatch) => {
  try {
    const token = await getToken();
    const data = await fetch(`${url}/me`, {
      headers: new Headers({
        Authorization: token,
      }),
    });
    const result = await data.json();
    dispatch({
      type: GET_ME,
      payload: result,
    });
  } catch (e) {
    console.log(e);
  }
};

export const getMyCourses = () => async (dispatch) => {
  try {
    const token = await getToken();
    const data = await fetch(`${url}/courses/my-courses/`, {
      headers: new Headers({
        Authorization: token,
      }),
    });
    const result = await data.json();
    dispatch({
      type: GET_MY_COURSES,
      payload: result,
    });
  } catch (err) {
    console.log(err);
  }
};

export const login = (email, password) => async (dispatch) => {
  console.log("Login action: ", email, password);
  try {
    const response = await fetch(`${url}/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email, password }),
    });
    const result = await response.json();
    console.log("Login action: ", result);
    localStorage.setItem("token", result.token);
    dispatch({
      type: LOGIN,
      payload: result,
    });
  } catch (e) {
    console.log(e);
  }
};
