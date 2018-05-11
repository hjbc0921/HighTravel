import { connect } from 'react-redux'
import  User  from "../components/molecules/User";
import { storeTripId } from "../store/user/actions";

const mapStateToProps = (state) => {
    console.log('container')
    console.log(state)
    console.log(state.user)
  return {
    triplist: state.user.trips,
  }
}

const mapDispatchToProps = (dispatch) => {
  console.log('tripIdSave')
  return {
    tripIdSave: (tripID) => {
        dispatch(storeTripId(tripID))
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(User)
