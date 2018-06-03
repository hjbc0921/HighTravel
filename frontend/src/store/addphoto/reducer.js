import { initialState } from "./selectors"
import { STORE_FOLDER,ADDFOLDER_REQUEST, ADDFOLDER_FAIL, ADDFOLDER_SUCCESS } from "./actions";

const addphoto_reducer = (state = initialState, action) => {
   switch (action.type) {
      case ADDFOLDER_REQUEST:
       return {
        updated : false,
       };
      case ADDFOLDER_FAIL:
       return Object.assign({},state,{
        err : action.err,
        updated : false,
       })
      case ADDFOLDER_SUCCESS:
       return Object.assign({},state,{
        message : action.message,
        updated : true,
       })
       case STORE_FOLDER:
       return Object.assign({},state,{
       })
     default:
       return state
     }
};

export default addphoto_reducer
