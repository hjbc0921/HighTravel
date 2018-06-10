import { initialState } from './selectors'

const photos_reducer = (state = initialState, action) => {

    switch (action.type){
       case 'STORE_PHOTO':
          sessionStorage.setItem('photoList', JSON.stringify(action.photos))
                return Object.assign({}, state, {
                       photos : action.photos
                }) 
       case 'STORE_PHOTO_REQUEST':
           return Object.assign({},state,{}
            )
      default:
          return state
    }
}

export default photos_reducer
