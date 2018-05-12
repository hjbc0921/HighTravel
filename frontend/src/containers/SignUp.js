import { connect } from 'react-redux'
import { SignUp } from "../components/molecules/SignUp";
import { signupRequest } from "../store/signup/actions";

const mapStateToProps = (state) => {
  return {
    signUp: state.signup,
  }
};

const mapDispatchToProps = (dispatch) => {
  console.log('onSignUp')
  return {
    onSignUp: (username,password,pwd_check) => {
      dispatch(signupRequest(username, password,pwd_check))
    }
  }
};

export default connect(mapStateToProps, mapDispatchToProps)(SignUp)
