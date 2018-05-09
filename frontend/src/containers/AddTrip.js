import { connect } from 'react-redux'
import { AddTrip } from "../components/molecules/AddTrip";
import { addtripRequest } from "../store/addtrip/actions";

const mapStateToProps = (state) => {
  return{
    addTrip : state.addtrip,
 }
};

const mapDispatchToProps = (dispatch) =>{
  console.log('onAddTrip')
  return{
   onAddTrip: (title,sinceWhen,untilWhen) => {
      dispatch(addtripRequest(title,sinceWhen,untilWhen))
   }
 }
};

export default connect(mapStateToProps, mapDispatchToProps)(AddTrip)
