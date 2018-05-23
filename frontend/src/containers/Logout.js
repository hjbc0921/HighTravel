import { connect } from 'react-redux'
import Logout from "../components/molecules/Logout";
import {logoutRequest} from "../store/logout/actions";

const mapStateToProps = (state) => {
  return {
    logout: state.logout,
  }
};


const mapDispatchToProps = (dispatch) => {
  return {
    onLogout: () => {
      dispatch(logoutRequest())
    }
  }
};

export default connect(mapStateToProps, mapDispatchToProps)(Logout)
