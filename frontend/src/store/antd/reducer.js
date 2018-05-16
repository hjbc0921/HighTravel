import { initialState } from "./selectors"
import {CHANGE, TOGGLE} from "./actions";

const intro_reducer = (state = initialState, action) => {
  switch(action.type) {
    case TOGGLE:
      return Object.assign({},state,{
        collapsed : !action.col
      })
    case CHANGE:
      return Object.assign({},state,{
        current : action.e
      })
    default:
      return state
  }
};

export default intro_reducer
