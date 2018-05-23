import { initialState } from "./selectors"
import {LOGIN_FAILED, USER_INFO_RECEIVED} from "./actions";

const intro_reducer = (state = initialState, action) => {
  switch(action.type) {
    case USER_INFO_RECEIVED:
      return Object.assign({},state,{
        trying : true,
        success : true,
        error : false,
        message : "",
        username: action.username,
        token: action.token,
        userId: action.userId,
      })
    case LOGIN_FAILED:
      return Object.assign({},state,{
        trying : true,
        success : false,
        error : true,
        message : action.errorMessage,
        username : "",
        token : "",
        userId : ""
      })
    default:
      return state
  }
};

export default intro_reducer
