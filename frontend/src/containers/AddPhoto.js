import { connect } from 'react-redux'
import { AddPhoto } from "../components/molecules/AddPhoto";
//import { addphotoRequest } from "../store/addphoto/actions";

const mapStateToProps = (state) => {
   return{
      addPhoto : state.addphoto,
  }
};

const mapDispatchToProps = (dispatch) => {
   return{
      onAddPhoto: (selectedFile,text) =>{
           // dispatch(addphotoRequest(selectedFile,text))
      }
   }
};

export default connect(mapStateToProps, mapDispatchToProps)(AddPhoto)

                                                                      
