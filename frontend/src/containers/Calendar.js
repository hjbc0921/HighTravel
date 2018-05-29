import { connect } from 'react-redux'
//import { postScheduleRequest } from '../store/schedules/actions'
import { Calendar } from "../components/molecules/Calendar"

const mapStateToProps = (state) => {
  var sche = []
  console.log(sessionStorage.getItem('tripSchedules'))
  if (sessionStorage.getItem('tripSchedules')!=="undefined"){
    sche = JSON.parse(sessionStorage.getItem('tripSchedules'))
  }
  console.log("SCHE########",sche,state.schedules.schedules)
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
