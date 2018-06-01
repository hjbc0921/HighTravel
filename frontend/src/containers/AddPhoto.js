import { connect } from 'react-redux'
import { AddPhoto } from "../components/molecules/AddPhoto";
//import { addphotoRequest } from "../store/addphoto/actions";

const mapStateToProps = (state) => {
  var fol = [{"name":"default"}]
  if (sessionStorage.getItem('tripFolders')!=="undefined"){
    fol = JSON.parse(sessionStorage.getItem('tripFolders'))
    console.log('in Add Photo container', fol)
  }
   return{
      folder : fol
  }
};

const mapDispatchToProps = (dispatch) => {
   return{
      onAddPhoto: (folder,selectedFiles) =>{
        dispatch(addphotoRequest(folder,selectedFiles))
      }
   }
};

export default connect(mapStateToProps, mapDispatchToProps)(AddPhoto)
