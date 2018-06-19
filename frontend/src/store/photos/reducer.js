import { initialState } from './selectors'

const photos_reducer = (state = initialState, action) => {

    switch (action.type){
       case 'STORE_PHOTO':
       sessionStorage.setItem("folderPhoto",JSON.stringify(action.photos))
                return Object.assign({}, state, {
                       photos : action.photos,
                       updated : true
                }) 
       case 'STORE_PHOTO_REQUEST':
           return Object.assign({},state,{
               updated : false
           }
            )
       case 'DELETE_PHOTO_REQUEST':
           return Object.assign({},state,{
            updated : false
            }
            )
      default:
          return state
    }
}

export default photos_reducer
