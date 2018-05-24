import { initialState} from "./selectors"
import { ADDEXPENSE_REQUEST, ADDEXPENSE_FAIL, ADDEXPENSE_SUCCESS} from "./actions";

const expense_reducer = (state = initialState, action) => {
   switch (action.type) {
      case ADDEXPENSE_REQUEST:
       return {

       };
      case ADDEXPENSE_FAIL:
       return Object.assign({},state,{
        message : action.err
       })
      case ADDEXPENSE_SUCCESS:
       return Object.assign({},state,{
         
       })
     default:
       return state
     }
};

export default expense_reducer
