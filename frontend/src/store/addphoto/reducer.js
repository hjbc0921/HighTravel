import { initialState } from './selectors'
import { ADDPHOTO_REQUEST, ADDPHOTO_FAIL} from "./actions";

const addphoto_reducer = (state = initialState, action) => {
     switch (action.type) {
          case ADDPHOTO_REQUEST:
           return {

           };
          case ADDPHOTO_FAIL:
           return {
 
           };
                  
          default:
           return state
           }
};

export default addphoto_reducer
