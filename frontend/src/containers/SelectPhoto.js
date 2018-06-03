import { connect } from 'react-redux'
import {SelectPhoto} from '../components/molecules/SelectPhoto'
//import { addphotoRequest } from "../store/addphoto/actions";

const mapStateToProps = (state) => {
  var photos = []
  var photoOfDate = sessionStorage.getItem('photoOfDate')
  console.log('photoDfDate', photoOfDate)
  console.log(typeof(photoOfDate))
  if (photoOfDate!=="undefined" && photoOfDate!==null) {
    photos = JSON.parse(photoOfDate)
    console.log('in Add Diary container', photos)
  } 
   return{
      photos : photos
  }
};

const mapDispatchToProps = (dispatch) => {
   return{
      onAddDiary: (date, contents,selectedFiles) =>{
        //dispatch(addDiaryRequest(date, contents,selectedFiles))
      }
   }
};

export default connect(mapStateToProps, mapDispatchToProps)(SelectPhoto)
