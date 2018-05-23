import { connect } from 'react-redux'
import  User  from "../components/molecules/User";
import { storeTripId } from "../store/user/actions";

const mapStateToProps = (state) => {
  return {
    trips: state.user,
  }
};

const mapDispatchToProps = (dispatch) => {
  return {
    tripIdSave: (tripID, tripTitle) => {
        dispatch(storeTripId(tripID, tripTitle))
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(User)
