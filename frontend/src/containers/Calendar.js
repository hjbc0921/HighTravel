import { connect } from 'react-redux'
//import { postScheduleRequest } from '../store/schedules/actions'
import { Calendar } from "../components/molecules/Calendar"

const mapStateToProps = (state) => {
  var sche = []
  if (sessionStorage.getItem('tripSchedules')!=="undefined" && sessionStorage.getItem('tripSchedules')!==null){
    sche = JSON.parse(sessionStorage.getItem('tripSchedules'))
  }
  return {
    schedule : sche,
    updated : state.schedules.updated
  }
}


const mapDispatchToProps = (dispatch) => {
  return {
    
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Calendar)
