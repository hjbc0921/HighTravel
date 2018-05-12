import { initialState} from "./selectors"
import { ADDTRIP_REQUEST, ADDTRIP_FAIL} from "./actions";

const addtrip_reducer = (state = initialState, action) => {
   switch (action.type) {
      case ADDTRIP_REQUEST:
       return {

       };
      case ADDTRIP_FAIL:
       return Object.assign({},state,{
        message : action.err
       })
     default:
       return state
     }
};

export default addtrip_reducer
