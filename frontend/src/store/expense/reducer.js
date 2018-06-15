import { initialState} from "./selectors"
import { CHANGE_EXPENSE_CONTENT, DELETE_EXPENSE_ROWS, ADDEXPENSE_REQUEST, ADDEXPENSE_FAIL, ADDEXPENSE_SUCCESS, PATCHEXPENSE_FAIL, PATCHEXPENSE_SUCCESS} from "./actions"

const expense_reducer = (state = initialState, action) => {
   switch (action.type) {
      case ADDEXPENSE_REQUEST:
      return Object.assign({},state,{
        updated2 : false
       })
      case CHANGE_EXPENSE_CONTENT:
      return Object.assign({},state,{
        updated2 : false
       })
       case DELETE_EXPENSE_ROWS:
       return Object.assign({},state,{
        updated2 : false
       })
      case ADDEXPENSE_FAIL:
       return Object.assign({},state,{
        message : action.err,
        updated2 : false
       })
      case ADDEXPENSE_SUCCESS:
       return Object.assign({},state,{
        updated2 : true
       })
      case PATCHEXPENSE_FAIL:
       return Object.assign({},state,{
        updated2 : false
       })
      case PATCHEXPENSE_SUCCESS:
       return Object.assign({},state,{
        updated2 : true
       })
     default:
       return state
     }
};

export default expense_reducer
