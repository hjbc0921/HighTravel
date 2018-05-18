import { connect } from 'react-redux'
import { Triplist }  from "../components/molecules/Triplist";
import { storeTripId } from "../store/user/actions";

const mapStateToProps = (state) => {
    console.log('container')
    console.log("######TRIPLIST@@@@@@@@@@@",state)
    console.log(state.user)
  return {
    triplist: state.user.trips,
  }
}

const mapDispatchToProps = (dispatch) => {
  console.log('tripIdSave')
  return {
    tripIdSave: (tripID, tripTitle) => {
        dispatch(storeTripId(tripID, tripTitle))
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Triplist)
