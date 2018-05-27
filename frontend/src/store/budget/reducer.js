import { initialState} from "./selectors"
import { LOAD_BUDGET, ADDBUDGET_REQUEST, ADDBUDGET_FAIL, ADDBUDGET_SUCCESS} from "./actions";

const budget_reducer = (state = initialState, action) => {
   switch (action.type) {
      case ADDBUDGET_REQUEST:
       return {

       };
      case LOAD_BUDGET:
       sessionStorage.setItem('tripBudgets',JSON.stringify(action.tripBudgets))
       return Object.assign({},state,{
         tripBudgets : action.tripBudgets
       })
      case ADDBUDGET_FAIL:
       return Object.assign({},state,{
        message : action.err
       })
      case ADDBUDGET_SUCCESS:
       return Object.assign({},state,{
         
       })
     default:
       return state
     }
};

export default budget_reducer
