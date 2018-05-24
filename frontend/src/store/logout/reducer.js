import { initialState } from "./selectors"
import {LOGOUT_REQUEST} from "./actions";

const logout_reducer = (state = initialState, action) => {
  switch(action.type) {
    case LOGOUT_REQUEST:
    sessionStorage.clear()
      return Object.assign({},state,{
        trying : true,
        success : true,
        error : false,
        message : "",
        username: action.username,
        token: action.token,
        userId: action.userId,
      })
    default:
      return state
  }
};

export default logout_reducer
