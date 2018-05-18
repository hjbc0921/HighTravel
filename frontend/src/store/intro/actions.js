export const LOGIN_REQUEST = 'LOGIN_REQUEST';
export const USER_INFO_RECEIVED = 'INTRO_RECEIVED';
export const LOGIN_FAILED = 'LOGIN_FAILED';

export const IntroReceived = ({username, token, userId}) => {
  return {
    type: USER_INFO_RECEIVED,
    username: username,
    token: token,
    userId: userId
  }
};

export const loginFailed = (err) => {
    console.log('action')
    console.log(err)
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
