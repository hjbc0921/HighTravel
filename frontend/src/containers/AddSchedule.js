import {connect} from 'react-redux'
import {AddSchedule} from "../components/molecules/AddSchedule";
import {addscheduleRequest} from "../store/addschedule/actions";

const mapStateToProps = (state) => {
  return {
      addSchedule: state.addschedule,
  }
};

const mapDispatchToProps = (dispatch) => {
 return {
     onAddSchedule: (contents,since,until)=>{
         dispatch(addscheduleRequest(contents,since,until))
        }
     }
};

export default connect(mapStateToProps, mapDispatchToProps)(AddSchedule)

