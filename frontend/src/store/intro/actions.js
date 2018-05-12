export const LOGIN_REQUEST = 'LOGIN_REQUEST';
export const LOGOUT_REQUEST = 'LOGOUT_REQUEST';
export const USER_INFO_RECEIVED = 'INTRO_RECEIVED';
export const LOGIN_FAILED = 'LOGIN_FAILED';
export const SIGNUPPAGE_REQUEST = 'SIGNUPPAGE_REQUEST';

export const IntroReceived = ({username, password}) => {
  return {
    type: INTRO_RECEIVED,
    username: username,
    password: password
  }
};

export const loginFailed = (err) => {
  return {
    type: LOGIN_FAILED,
    errorMessage: err
  }
};

export const loginRequest = (username, password) => {
  return {
    type: LOGIN_REQUEST,
    username,
    password
  }
};

export const signuppageRequest = () => {
  return {
  type: SIGNUPPAGE_REQUEST
}
}
