import { connect } from 'react-redux'
import { User } from "../components/molecules/User";
import { addtripRequest } from "../store/user/actions";

const mapStateToProps = (state) => {
  return {
    addtrip: state.addtrip,
  }
};

const mapDispatchToProps = (dispatch) => {
  console.log('onAddTrip')
  return {
    onAddTrip: () => {
      dispatch(addtripRequest())
    }
  }
};

export default connect(mapStateToProps, mapDispatchToProps)(User)
