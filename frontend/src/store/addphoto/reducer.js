import { initialState} from "./selectors"
import { ADDFOLDER_REQUEST, ADDFOLDER_FAIL, ADDFOLDER_SUCCESS} from "./actions";

const addphoto_reducer = (state = initialState, action) => {
   switch (action.type) {
      case ADDFOLDER_REQUEST:
       return {

       };
      case ADDFOLDER_FAIL:
       return Object.assign({},state,{
        message : action.err
       })
      case ADDFOLDER_SUCCESS:
       return Object.assign({},state,{
         
       })
     default:
       return state
     }
};

export default addphoto_reducer
