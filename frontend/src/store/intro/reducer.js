import { initialState } from "./selectors"
import {LOGIN_FAILED, INTRO_RECEIVED} from "./actions";

const intro_reducer = (state = initialState, action) => {
    console.log('intro_reducer')
    console.log(action)
  switch(action.type) {
    case INTRO_RECEIVED:
      return Object.assign({},stats,{
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
        message : actions.errMsg,
        username : "",
        token : "",
        userId : ""
      })
    default:
      return state
  }
};

export default intro_reducer
