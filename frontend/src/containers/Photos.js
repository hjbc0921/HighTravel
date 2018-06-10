import { connect } from 'react-redux'
import { PhotoList } from '../components/molecules/Photos'
import { storePhotoRequest } from "../store/photos/actions";

const mapStateToProps = (state) => {
   var photos = []
   if (sessionStorage.getItem('photoList')!="undefined" && sessionStorage.getItem('photoList')!==null){
     photos = JSON.parse(sessionStorage.getItem('photoList'))
   }
  console.log("CONT########",photos)
   return {
     photo_list: photos
   }
}

const mapDispatchToProps = (dispatch) => {
    return {
       onPhotos:() => {
        dispatch(storePhotoRequest())
       }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(PhotoList)

