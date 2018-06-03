import {connect} from 'react-redux'
import {ScheduleList} from "../components/molecules/ScheduleList";
import { deleteScheduleRequest } from '../store/schedules/actions'

const mapStateToProps = (state) => {
  var schedules = sessionStorage.getItem('tripSchedules')
  if (sessionStorage.getItem('tripSchedules')!=="undefined"){
    schedules = JSON.parse(sessionStorage.getItem('tripSchedules'))
  }

  return {
    schedules,
   updated: state.schedules.updated
  }
};

const mapDispatchToProps = (dispatch) => {
 return {
     onDeleteSchedule: (scheIDs)=>{
         dispatch(deleteScheduleRequest(scheIDs))
        }
     }
};

export default connect(mapStateToProps, mapDispatchToProps)(ScheduleList)

