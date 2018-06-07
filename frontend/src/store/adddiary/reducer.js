import {initialState} from './selectors'
import { POST_DIARY_REQUEST, STORE_DATE_PHOTO } from "./actions";

const adddiary_reducer = (state = initialState, action) => {
   switch (action.type) {
      case POST_DIARY_REQUEST:
       return {

       };
      case STORE_DATE_PHOTO:
       return Object.assign({},state,{
        updated: true,
        photos : JSON.parse(sessionStorage.getItem('photoOfDate'))
       })
     default:
       return state
     }
};

export default adddiary_reducer
