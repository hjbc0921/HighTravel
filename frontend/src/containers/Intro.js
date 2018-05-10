import { connect } from 'react-redux'
import Intro from "../components/molecules/Intro";
import {loginRequest} from "../store/Intro/actions";//modify code!

const mapStateToProps = (state) => {
  return {
    intro: state.intro,
  }
};


const mapDispatchToProps = (dispatch) => {
  return {
    onLogin: (username, password) => {
      dispatch(loginRequest(username, password))
    }
  }
};

export default connect(mapStateToProps, mapDispatchToProps)(Intro)
