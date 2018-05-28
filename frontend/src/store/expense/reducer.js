import { initialState} from "./selectors"
import { ADDEXPENSE_REQUEST, ADDEXPENSE_FAIL, ADDEXPENSE_SUCCESS, PATCHEXPENSE_FAIL, PATCHEXPENSE_SUCCESS} from "./actions";

const expense_reducer = (state = initialState, action) => {
   switch (action.type) {
      case ADDEXPENSE_REQUEST:
       return {

       }
      case ADDEXPENSE_FAIL:
       return Object.assign({},state,{
        message : action.err
       })
      case ADDEXPENSE_SUCCESS:
       return Object.assign({},state,{
         
       })
      case PATCHEXPENSE_FAIL:
       return Object.assign({},state,{
        updated : false
       })
      case PATCHEXPENSE_SUCCESS:
       return Object.assign({},state,{
        updated : true
       })
     default:
       return state
     }
};

export default expense_reducer
