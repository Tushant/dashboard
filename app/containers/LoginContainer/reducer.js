/*
 *
 * LoginContainer reducer
 *
 */

import { fromJS } from "immutable";
import {
  DEFAULT_ACTION,
  LOGIN_REQUEST,
  LOGIN_SUCCESS,
  LOGIN_FAILURE
} from "./constants";

const initialState = fromJS({
  requesting: false,
  successful: false,
  isLoggedIn: false,
  userInfo: {},
  messages: {},
  errors: {}
});

function loginReducer(state = initialState, action) {
  switch (action.type) {
    case LOGIN_REQUEST:
      return state.set("requesting", true).set("successful", false);
    case LOGIN_SUCCESS:
      localStorage.setItem("token", action.user.data.token);
      localStorage.setItem("user", JSON.stringify(action.user.data));
      return state
        .set("userInfo", action.user.data.userInfo)
        .set("isLoggedIn", true);
    case LOGIN_FAILURE:
      console.log('login-error',action);
      return state
        .set("requesting", false)
        .set("successful", false)
        .setIn(["errors", "body"], action.error);
    case DEFAULT_ACTION:
      return state;
    default:
      return state;
  }
}

export default loginReducer;
