import {initialState} from './selectors'
import { POST_DIARY_REQUEST, STORE_DATE_PHOTO } from "./actions";

const adddiary_reducer = (state = initialState, action) => {
   switch (action.type) {
      case POST_DIARY_REQUEST:
       return {
        photos : [],
        error : false,
        updated : false
       };
      case STORE_DATE_PHOTO:
       return Object.assign({},state,{
        updated: false,
        error : false,
        photos : JSON.parse(sessionStorage.getItem('photoOfDate'))
       })
       case 'ADD_DIARY_SUCCESS':
       return Object.assign({},state,{
        updated: true,
        error : false,
        photos : []
       })
       case 'ADD_DIARY_FAIL' :
       return Object.assign({},state,{
        updated: false,
        error : true,
        photos : []
       })
     default:
       return state
     }
};

export default adddiary_reducer
