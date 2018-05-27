import {connect} from 'react-redux'
import {AddSchedule} from "../components/molecules/AddSchedule";
import {postScheduleRequest} from "../store/schedules/actions";

const mapStateToProps = (state) => {
  return {
    schedule:state.schedule,
  }
};

const mapDispatchToProps = (dispatch) => {
 return {
     onAddSchedule: (contents,since,until)=>{
         dispatch(postScheduleRequest(contents,since,until))
        }
     }
};

export default connect(mapStateToProps, mapDispatchToProps)(AddSchedule)

