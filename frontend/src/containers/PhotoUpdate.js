import { connect } from 'react-redux'
import { Photo } from '../components/organisms/Photo
import { storePhotoRequest } from "../store/photos/actions";

const mapStateToProps = (state) => {

 return {

 }
}

const mapDispatchToProps = (dispatch) => {
  return {
     onPhoto:() =>{
       dispatch(storePhotoRequest())
       }
     }
}

export default connect(mapStateToProps, mapDispatchToProps)(Photo)
