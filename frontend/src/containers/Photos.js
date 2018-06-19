import { connect } from 'react-redux'
import { PhotoList } from '../components/molecules/Photos'
import { deletePhotoRequest, deleteFolderRequest} from "../store/photos/actions";

const mapStateToProps = (state) => {
   var photos = []
   if (sessionStorage.getItem('folderPhoto')!="undefined" && sessionStorage.getItem('folderPhoto')!==null){
     photos = JSON.parse(sessionStorage.getItem('folderPhoto'))
   }
   return {
     photo_list: photos,
     updated: state.photos.updated
   }
}

const mapDispatchToProps = (dispatch) => {
    return {
    onDeletePhotos:(photoIDs) => {
      dispatch(deletePhotoRequest(photoIDs))
    },
    onDeleteFolders : (id) => {
      dispatch(deleteFolderRequest(id))
    }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(PhotoList)

