import { initialState} from "./selectors"
import { SIGNUP_REQUEST, SIGNUP_SUCCESS, SIGNUP_FAIL } from "./actions";

const signup_reducer = (state = initialState, action) => {
   switch (action.type){
      case SIGNUP_REQUEST:
        return {
        };
      case SIGNUP_SUCCESS:
        return Object.assign({},state,{
            trying : true,
            success : true,
            error : false,
            message : "LOGIN",
        })
      case SIGNUP_FAIL:
        return Object.assign({},state,{
            trying : false,
            success : false,
            error : true,
            message : action.err,
        })
      default:
        return state
     }
}

export default signup_reducer
