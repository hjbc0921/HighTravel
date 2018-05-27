import { connect } from 'react-redux'
import Intro from "../components/molecules/Intro";
import {loginRequest,signupRequest} from "../store/intro/actions";
const mapStateToProps = (state) => {
  return {
    intro: state.intro,
  }
};


const mapDispatchToProps = (dispatch) => {
  return {
    onLogin: (username, password) => {
      dispatch(loginRequest(username, password))
    },
    onSignup: () => {
      dispatch(signupRequest())
    }
  }
};

export default connect(mapStateToProps, mapDispatchToProps)(Intro)
