import { initialState} from "./selectors"
import { ADDTRIP_REQUEST} from "./actions";

const addtrip_reducer = (state = initialState, action) => {
   switch (action.type) {
     case ADDTRIP_REQUEST:
       return {

       };
     default:
       return state
     }
};

export default addtrip_reducer
