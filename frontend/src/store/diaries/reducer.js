import {initialState} from './selectors'

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
        default:
              return state
    }
}

export default diaries_reducer  
