import { connect } from 'react-redux'
import { PhotoList } from '../components/molecules/Photos'
import { storePhotoRequest } from "../store/photos/actions";

const mapStateToProps = (state) => {
   var photos = []
   if (sessionStorage.getItem('photoList')!="undefined"){
     photos = JSON.parse(sessionStorage.getItem('photoList'))
   }
   else
   console.log("und photo")
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

