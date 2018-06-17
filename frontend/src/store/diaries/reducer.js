import {initialState} from './selectors'
import { CHANGE_DIARY_CONTENT, DELETE_DIARY_REQUEST} from "./actions"

const diaries_reducer = (state = initialState, action) => {

     switch (action.type){
        case 'STORE_DIARY':
           sessionStorage.setItem('diaryList', JSON.stringify(action.diaries))
                 return Object.assign({}, state, {
                        diaries : action.diaries
                 })
        case 'STORE_DIARY_REQUEST':
              return Object.assign({},state,{}
              )
	case 'CHANGE_DIARY_CONTENT':
            return Object.assign({},state,{
                updated : false
            })
	case 'DELETE_DIARY_REQUEST':
	return Object.assign({},state,{
		updated : false
	}) 
        default:
              return state
    }
}

export default diaries_reducer  
