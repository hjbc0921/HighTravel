import { initialState} from "./selectors"
import { SIGNUP_REQUEST} from "./actions";

const signup_reducer = (state = initialState, action) => {
   switch (action.type){
      case SIGNUP_REQUEST:
        return {
        };
      default:
        return state
     }
}

export default signup_reducer
