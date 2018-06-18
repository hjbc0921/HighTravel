import { connect } from 'react-redux'
import { Photo } from "../components/organisms/Photo"
import { storePhotoRequest } from "../store/photos/actions";

const mapStateToProps = (state) => {

 return {
     Pho:  state
 }
}

const mapDispatchToProps = (dispatch) => {
  return {
     onPhoto:(temp) =>{
       dispatch(storePhotoRequest())
       }
     }
}

export default connect(mapStateToProps, mapDispatchToProps)(Photo)
