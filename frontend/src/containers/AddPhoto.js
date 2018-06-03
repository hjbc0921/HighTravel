import { connect } from 'react-redux'
import { AddPhoto } from "../components/molecules/AddPhoto";
import { addphotoRequest } from "../store/addphoto/actions";

const mapStateToProps = (state) => {
   return{
    updated : state.addphoto.updated,
    error : state.addphoto.error
  }
};

const mapDispatchToProps = (dispatch) => {
   return{
      onAddPhoto: (folder,fileList) =>{
        dispatch(addphotoRequest(folder,fileList))
      }
   }
};

export default connect(mapStateToProps, mapDispatchToProps)(AddPhoto)
