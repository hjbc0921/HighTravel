import { connect } from 'react-redux'
import { AddPhoto } from "../components/molecules/AddPhoto";
//import { addphotoRequest } from "../store/addphoto/actions";

const mapStateToProps = (state) => {
   return{
      addPhoto : state.addphoto,
      folder : [{id:1,name:"180202_cafe"},{id:2,name:"180303_bread"}]
  }
};

const mapDispatchToProps = (dispatch) => {
   return{
      onAddPhoto: (folder,selectedFile) =>{
           // dispatch(addphotoRequest(selectedFile,text))
      }
   }
};

export default connect(mapStateToProps, mapDispatchToProps)(AddPhoto)

                                                                      
