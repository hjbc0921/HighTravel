mport { initialState } from "./selectors"
import {LOGIN_FAILED, INTRO_RECEIVED} from "./actions";

const intro_reducer = (state = initialState, action) => {
  switch(action.type) {
    case INTRO_RECEIVED:
      return {
        username: action.username,
        password: action.password,
        isLogin: true,
        errorMessage: ''
      };
    case LOGIN_FAILED:
      return {
        userId: '',
        username: '',
        password: '',
        isLogin: false,
        errorMessage: action.errorMessage
      };
    default:
      return state
  }
};

export default intro_reducer
