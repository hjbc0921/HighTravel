import { initialState} from "./selectors"
import { ADDTRIP_REQUEST, ADDTRIP_FAIL, ADDTRIP_SUCCESS} from "./actions";

const addtrip_reducer = (state = initialState, action) => {
   switch (action.type) {
      case ADDTRIP_REQUEST:
       return {

       };
      case ADDTRIP_FAIL:
       return Object.assign({},state,{
        message : action.err
       })
      case ADDTRIP_SUCCESS:
       return Object.assign({},state,{
         
       })
     default:
       return state
     }
};

export default addtrip_reducer
