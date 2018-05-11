import { initialState} from "./selectors"
import { ADDTRIP_REQUEST} from "./actions";

const user_reducer = (state = initialState, action) => {
   console.log(Array.isArray(action.tripRules))
   switch (action.type) {
        case 'ADDTRIP_REQUEST':
			return{};
        default:
            return state
    }
}

export default user_reducer

