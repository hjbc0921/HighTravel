import { connect } from 'react-redux'
import {SelectPhoto} from '../components/molecules/SelectPhoto'
import { postDiaryRequest } from "../store/addphoto/actions"

const mapStateToProps = (state) => {
  var photos = []
  var photolist = []
  var imageUrl

  // sessionStorage holds real photo list(including photo's id)
  // photolist only holds image url and their size to be shown

  var photoOfDate = sessionStorage.getItem('photoOfDate')
  if (photoOfDate!=="undefined" && photoOfDate!==null) {
    photos = JSON.parse(photoOfDate)
  } 

  for (var i=0; i<photos.length; i++) {
      imageUrl = photos[i].image
      imageUrl = imageUrl.replace("localhost:3000", "127.0.0.1:8000")
      photolist.push({src: imageUrl, width: 5, height: 4})
  }
   return{
     photos : photolist,
     updated: state.adddiary.updated
  }
}

const mapDispatchToProps = (dispatch) => {
   return{
      onAddDiary: (date, contents,selectedFiles) => {
        dispatch(postDiaryRequest(date, contents,selectedFiles))
      }
   }
}

export default connect(mapStateToProps, mapDispatchToProps)(SelectPhoto)
