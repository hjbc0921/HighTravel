import { connect } from 'react-redux'
import Intro from "../components/molecules/Intro";
import {loginRequest} from "../store/intro/actions";//modify code!
//import {signupRequest} from "../store/intro/actions";
const mapStateToProps = (state) => {
    console.log('container')
    console.log(state.intro)
  return {
    intro: state.intro,
  }
};


const mapDispatchToProps = (dispatch) => {
  return {
    onLogin: (username, password) => {
      dispatch(loginRequest(username, password))
    }//,
//    onSignUpPage: () => {
//      dispatch(signuppageRequest())
//    }
  }
};

export default connect(mapStateToProps, mapDispatchToProps)(Intro)
