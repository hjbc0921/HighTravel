import { connect } from 'react-redux'
import { AddDiary } from '../components/molecules/AddDiary'
import { pickDate, postDiaryRequest } from "../store/adddiary/actions"

const mapStateToProps = (state) => {
   return{
  }
};

const mapDispatchToProps = (dispatch) => {
   return{
      selectedDate: (date) => {
        dispatch(pickDate(date))
      },
      onAddDiary: (date, contents, photos) =>{
        dispatch(postDiaryRequest(date, contents, photos))
      }
   }
};

export default connect(mapStateToProps, mapDispatchToProps)(AddDiary)
