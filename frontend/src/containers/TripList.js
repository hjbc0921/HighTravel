import { connect } from 'react-redux'
import { Triplist }  from "../components/molecules/Triplist";
import { storeTripId } from "../store/user/actions";

const mapStateToProps = (state) => {
  return {
    triplist: state.user.trips,
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    tripIdSave: (tripID, tripTitle) => {
        dispatch(storeTripId(tripID, tripTitle))
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Triplist)
