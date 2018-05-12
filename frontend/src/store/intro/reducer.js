import { initialState } from "./selectors"
import {LOGIN_FAILED, INTRO_RECEIVED} from "./actions";

const intro_reducer = (state = initialState, action) => {
    console.log('intro_reducer')
    console.log(action)
  switch(action.type) {
    case INTRO_RECEIVED:
      return {
        username: action.username,
        token: action.token,
        userId: action.userId,
        isLogin: true,
        errorMessage: ''
      };
    case LOGIN_FAILED:
      return {
        username: '',
        token: '',
        userId: '',
        isLogin: false,
        errorMessage: action.errMsg
      };
    default:
      return state
  }
};

export default intro_reducer
