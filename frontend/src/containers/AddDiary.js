import { connect } from 'react-redux'
import { AddDiary } from '../components/molecules/AddDiary'
import { pickDate, postDiaryRequest } from "../store/adddiary/actions"

const mapStateToProps = (state) => {
  var photolist = []
  var imageUrl

  // state holds real photo list(including photo's id)
  // photolist only holds image url and their size to be shown

  var photoOfDate = state.adddiary.photos
 
  for (var i=0; i<photoOfDate.length; i++) {
      imageUrl = photoOfDate[i].image
      imageUrl = imageUrl.replace("localhost:3000", "127.0.0.1:8000")
      photolist.push({src: imageUrl, width: 5, height: 4})
  }
   return{
     photos : photolist,
     updated : state.adddiary.updated,
     error : state.adddiary.error
  }
}

const mapDispatchToProps = (dispatch) => {
   return{
      selectedDate: (date) => {
        dispatch(pickDate(date))
      },
      onAddDiary: (date, contents, select) =>{
        dispatch(postDiaryRequest(date, contents, select))
      }
   }
};

export default connect(mapStateToProps, mapDispatchToProps)(AddDiary)
