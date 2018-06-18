import {connect} from 'react-redux'
import ScheduleList from "../components/molecules/ScheduleList"
import { changeScheduleContent, deleteScheduleRequest } from '../store/schedules/actions'

const mapStateToProps = (state) => {
  let schedules = []
  if ( sessionStorage.getItem('tripSchedules')!==null && sessionStorage.getItem('tripSchedules')!=="undefined"){
    schedules = JSON.parse(sessionStorage.getItem('tripSchedules'))
  }
  return {
  schedules : schedules,
  updated: state.schedules.updated
  }
};

const mapDispatchToProps = (dispatch) => {
 return {
    changeContent: (idUpdatedRow) => {
      dispatch(changeScheduleContent(idUpdatedRow))
    },
     onDeleteSchedule: (scheIDs)=>{
         dispatch(deleteScheduleRequest(scheIDs))
        }
     }
};

export default connect(mapStateToProps, mapDispatchToProps)(ScheduleList)
