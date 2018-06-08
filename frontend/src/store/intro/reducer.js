import { initialState } from "./selectors"
import {SIGNUP_REQUEST,LOGIN_FAILED, USER_INFO_RECEIVED} from "./actions";

const intro_reducer = (state = initialState, action) => {
  switch(action.type) {
    case USER_INFO_RECEIVED:
      return Object.assign({},state,{
        error : false,
      })
    case LOGIN_FAILED:
      return Object.assign({},state,{
        message : action.errorMessage,
 
      })
    case SIGNUP_REQUEST:
      return Object.assign({},state,{
        message : ""
      })
    default:
      return state
  }
};

export default intro_reducer
