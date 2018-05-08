export const SIGNUP_REQUEST = 'SIGNUP_REQUEST';

export const signupRequest = (username, password) => {
  return {
    type = SIGNUP_REQUEST,
    username,
    password
  }
};
